
import { ChartBarIcon, ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
// import { ChartBarIcon, ChevronDownIcon, DesktopComputerIcon, GlobeAltIcon, ShieldCheckIcon, ViewGridIcon, MenuIcon, MenuAlt1Icon, MenuAlt2Icon, MenuAlt3Icon, MenuAlt4Icon, SupportIcon, BookmarkIcon, BookmarkAltIcon, QuestionMarkCircleIcon, DotsVerticalIcon, CodeIcon, PhoneIcon, DotsHorizontalIcon, PhotographIcon, XIcon } from '@heroicons/react/24/outline';
import { FC } from "react"


interface Icon {
  icon: string
  className?: string
}

export const Icon: FC<Icon> = ({ icon, className ="flex-shrink-0 h-6 w-6 text-orange-600" }) => {

  switch (icon) {
    
    // case 'x':
    //   return <XIcon className={className} />;
    // case 'photograph':
    //   return <PhotographIcon className={className} />;
    // case 'phone-icon':
    //   return <PhoneIcon className={className} />;
    case 'chevron-down':
      return <ChevronDownIcon className={className} />;
    // case 'code-icon':
    //   return <CodeIcon className={className} />;
    // case 'dots-horizontal':
    //   return (
    //     <DotsHorizontalIcon className={className} />);
    // case 'dots-vertical':
    //   return (
    //     <DotsVerticalIcon className={className} />);
    // case 'menu':
    //   return (
    //     <MenuIcon className={className} />);
    // case 'menu-alt-1':
    //   return (
    //     <MenuAlt1Icon className={className} />);
    // case 'menu-alt-2':
    //   return (
    //     <MenuAlt2Icon className={className} />);
    // case 'menu-alt-3':
    //   return (
    //     <MenuAlt3Icon className={className} />);
    // case 'menu-alt-4':
    //   return (
    //     <MenuAlt4Icon className={className} />);
    // case 'globe-alt':
    //   return (
    //     <GlobeAltIcon className={className} />);
    case 'chart-bar':
      return (
        <ChartBarIcon className={className} />);
    // case 'shield-check':
    //   return (
    //     <ShieldCheckIcon className={className} />);
    // case 'view-grid':
    //   return (
    //     <ViewGridIcon className={className} />);
    // case 'desktop-computer':
    //   return (
    //     <DesktopComputerIcon className={className} />);
    // case 'support':
    //   return (
    //     <SupportIcon className={className} />);
    // case 'bookmark-alt':
    //   return (
    //     <BookmarkAltIcon className={className} />);
    case 'question-mark-circle':
      return (
        <QuestionMarkCircleIcon className={className} />);
    default:
      return null;
  }
}