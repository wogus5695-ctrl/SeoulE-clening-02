import { CONTACT_PHONE } from '@/lib/seo';
import styles from './MobileFloatingCTA.module.css';

export default function MobileFloatingCTA() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <a href={`tel:${CONTACT_PHONE}`} className={styles.btn}>
          <span className={styles.icon}>📞</span>
          <span className={styles.text}>실시간 무료 전화 상담</span>
        </a>
      </div>
    </div>
  );
}

