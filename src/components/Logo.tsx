import logo from '../images/logo-bota-fe.png';
import styles from './Logo.module.css';

const Logo = () => {
	return <img class={styles.logo} src={logo} alt='Logo Bota Fé' />;
};

export default Logo;
