import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon'
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import MapBinIcon from '@heroicons/react/24/solid/MapPinIcon'
import ChartPieIcon from '@heroicons/react/24/solid/ChartPieIcon'
import CliboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon'
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Nhân viên',
    path: '/staffs',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Địa điểm',
    icon: (
      <SvgIcon fontSize="small">
        <MapBinIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'Điểm giao dịch',
        path: '/locations/pickup-point',
      },
      {
        title: 'Điểm tập kết',
        path: '/locations/assemble-point'
      }
    ]
  },
  {
    title: 'Đơn hàng',
    icon: (
      <SvgIcon fontSize="small">
        <CliboardDocumentListIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tra cứu đơn hàng",
      },
      {
        title: "Xác nhận đơn hàng"
      },
      {
        title: "Tạo đơn hàng",
      },
    ]
  },
  {
    title: 'Đơn vận chuyển',
    icon: (
      <SvgIcon fontSize="small">
        <TruckIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tra cứu đơn vận chuyển",
      },
      {
        title: "Xác nhận đơn vận chuyển"
      },
      {
        title: "Tạo đơn vận chuyển"
      }
    ]
  },
  {
    title: "Thống kê",
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tài khoản',
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'Hồ sơ người dùng',
        path: '/account', 
      },
      {
        title: 'Cài đặt',
        path: '/settings',
      },
    ]
  },
  
];
