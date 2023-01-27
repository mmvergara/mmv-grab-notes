import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className='navbar bg-base-300'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          Grab Quotes!
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 menu-'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          <li>
            <Link href='/settings'>Settings</Link>
          </li>
          <li>
            <Link href='/notes'>Notes</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
