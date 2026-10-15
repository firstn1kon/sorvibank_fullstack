// Design-system barrel for /design-sync. Copied into the generated package as
// src/ds-index.ts by .design-sync/build-pkg.mjs - paths are relative to frontend/src.
// The app itself never imports this file.
import './ds-fonts.css';
import './index.css';

export { default as SorvibankProvider } from './ds-provider';

// ui primitives
export { default as Button } from './components/ui/button/Button';
export { default as Input } from './components/ui/input/Input';
export { default as PasswordInput } from './components/ui/input/PasswordInput';
export { default as PhoneInput } from './components/ui/input/PhoneInput';
export { default as DotLoader } from './components/ui/loaders/DotLoader';
export { default as ProgressBarToast } from './components/ui/toast/ProgressBarToast';
export { default as Modal } from './components/Modal/Modal';
export { default as ErrorMessage } from './components/Error/Error';

// icons
export { default as AcceptIcon } from './components/ui/icons/AcceptIcon';
export { default as AccountIcon } from './components/ui/icons/AccountIcon';
export { default as AndroidIcon } from './components/ui/icons/AndroidIcon';
export { default as AppleIcon } from './components/ui/icons/AppleIcon';
export { default as CalendarIcon } from './components/ui/icons/CalendarIcon';
export { default as CardIcon } from './components/ui/icons/CardIcon';
export { default as DevicesIcon } from './components/ui/icons/DevicesIcon';
export { default as EmailIcon } from './components/ui/icons/EmailIcon';
export { default as HomeIcon } from './components/ui/icons/HomeIcon';
export { default as LockIcon } from './components/ui/icons/LockIcon';
export { default as LogoutIcon } from './components/ui/icons/LogoutIcon';
export { default as LogoutPageIcon } from './components/ui/icons/LogoutPageIcon';
export { default as MenuIcon } from './components/ui/icons/MenuIcon';
export { default as PencilIcon } from './components/ui/icons/PencilIcon';
export { default as PhoneIcon } from './components/ui/icons/PhoneIcon';
export { default as ProfileIcon } from './components/ui/icons/ProfileIcon';
export { default as SessionsIcon } from './components/ui/icons/SessionsIcon';
export { default as WarningIcon } from './components/ui/icons/WarningIcon';
export { default as WindowsIcon } from './components/ui/icons/WindowsIcon';
export { PasswordIcon, PasswordIconCrossed } from './components/ui/input/icons';

// landing sections
export { default as Header } from './components/Header/Header';
export { default as Footer } from './components/Footer/Footer';
export { default as FirstScreen } from './components/FirstScreen/FirstScreen';
export { default as Steps } from './components/Steps/Steps';
export { default as Tiles } from './components/Tiles/Tiles';
export { default as MapSection } from './components/MapSection/MapSection';
export { default as Video } from './components/Video/Video';
export { default as NotFound } from './components/404/NotFound';

// auth forms
export { default as LoginForm } from './components/LoginForm/LoginForm';
export { default as RegistrationForm } from './components/RegistrationForm/RegistrationForm';
export { default as RestoreForm } from './components/RestoreForm/RestoreForm';
export { default as ResetForm } from './components/ResetForm/ResetForm';

// profile
export { default as ProfileMain } from './components/profile/ProfileMain';
export { default as ChangePassword } from './components/profile/change-password/ChangePassword';
export { default as Sessions } from './components/profile/sessions/Sessions';
export { default as LogoutPage } from './components/profile/logout-page/LogoutPage';
