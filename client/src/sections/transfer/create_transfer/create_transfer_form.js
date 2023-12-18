// AddStaffForm.js
import React, { useState } from 'react';
import {
  Button,
  Paper,
  Grid,
  MenuItem,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

const CreateOrderForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    orderId: '',
    fromLocation: user.location,
    toLocation: '',
  });

  const locations = ['test', 'end', 'test2', 'end2', 'test3', 'end3']

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate asynchronous activity (e.g., sending data to the server)
    setDialogTitle('');
    setDialogMessage('Đang tạo đơn vận chuyển...');
    setDialogOpen(true);

    try {
      const response = await fetch(`http://localhost:3030/v1/transfers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (you may need to adjust based on your API response structure)
      if (response.ok) {
        // Reset form data after submission
        setFormData({
          orderId: '',
          fromLocation: '',
          toLocation: '',
        });
        setDialogTitle('Thành công');
        setDialogMessage('Đơn vận chuyển đã được tạo thành công!');
      } else {
        const msg = (await response.json()).error;
        setDialogTitle('Thất bại');
        if (msg === 'Order not found') {
          setDialogMessage('Đơn hàng không tồn tại!');
        } else if (msg === 'Require proper processor access') {
          setDialogMessage('Không có quyền tạo đơn vận chuyển');
        }{
          setDialogMessage('Đã xảy ra lỗi khi tạo đơn vận chuyển');
        }
      }
    } catch (error) {
      console.error('Error creating transfer:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi tạo đơn vận chuyển');
    }

    // Close the dialog after a delay (you can adjust the delay duration)
    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Tạo đơn vận chuyển
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={12}>
              <TextField
                label="Mã đơn hàng"
                fullWidth
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Điểm vận chuyển"
                fullWidth
                name="fromLocation"
                value={formData.fromLocation}
                disabled
              />
            </Grid>
            
            <Grid item xs={6} md={6}>
              <TextField
                label="Điểm nhận hàng"
                fullWidth
                select
                name="toLocation"
                value={formData.toLocation}
                onChange={handleInputChange}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: 250 },
                  }
                }}
              >
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                   { location }
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 4, float: 'right' }}
          >
            Tạo đơn vận chuyển
          </Button>
        </form>
      </Paper>
      {/* Dialog to indicate the status */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateOrderForm;