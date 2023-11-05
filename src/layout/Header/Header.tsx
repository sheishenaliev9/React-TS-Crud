import { NavLink } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="posts">Posts</NavLink>
      <NavLink to="create-post">Create Post</NavLink>
    </header>
  );
};

export default Header;
