import Link from 'next/link';
import { useState, useEffect } from 'react';

export default ({ currentUser }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [mounted, setMounted] = useState(false);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
//   const NotLogin = { (!currentUser) && (
//             <nav className="navbar navbar-light bg-slate-300">
//                 <Link className="navbar-brand ml-8" href="/">
//                     TicketSwift
//                 </Link>
    
//                 <div className="d-flex justify-content-end mr-8">
//                     <ul className="nav d-flex content-center font-sans">{links}</ul>
//                 </div>
//             </nav>
//         )) :
//         (
//             <div>
//                 <nav className="navbar navbar-light bg-slate-300">
//                     <Link className="navbar-brand mx-auto" href="/">
//                         TicketSwift
//                     </Link>
//                 </nav>
//                 <div
//                 className={`sidebar ${showSidebar ? 'show' : ''}`}
//                 >
//                     <div className="d-flex justify-content-end mt-8 mr-8">
//                         <ul className="nav d-flex content-center font-sans">{links}</ul>
//                     </div>
//                 </div>
//                 <div
//                 className="menu-toggle"
//                 onClick={toggleSidebar}
//                 >
//                     &#9776;
//                 </div>
//             </div>
//         )}

  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link className="nav-link" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(!mounted) return <></> // Prevent hydration mismatch error
  return (
    <div>
      {isMobile ? (
        <div>
            <nav className="navbar navbar-light bg-slate-300">
                <Link className="navbar-brand mx-auto" href="/">
                    TicketSwift
                </Link>
            </nav>
            <div
            className={`sidebar ${showSidebar ? 'show' : ''}`}
            >
                <div className="d-flex justify-content-end mt-8 mr-8">
                    <ul className="nav d-flex content-center font-sans">{links}</ul>
                </div>
            </div>
            <div
            className="menu-toggle"
            onClick={toggleSidebar}
            >
                &#9776;
            </div>
        </div>
      ) : (
        <nav className="navbar navbar-light bg-slate-300">
            <Link className="navbar-brand ml-8" href="/">
                TicketSwift
            </Link>

            <div className="d-flex justify-content-end mr-8">
                <ul className="nav d-flex content-center font-sans">{links}</ul>
            </div>
        </nav>
      )}
    </div>
  );
};
