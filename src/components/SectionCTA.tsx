import { CONTACT_PHONE, BRAND_NAME } from '@/lib/seo';
import styles from './SectionCTA.module.css';

interface Props {
  title?: string;
  subtitle?: string;
}

export default function SectionCTA({ 
  title = `빠르고 정확한 ${BRAND_NAME} 상담 안내`, 
  subtitle = "현장 정보를 미리 알려주시면 더욱 상세한 견적 안내가 가능합니다." 
}: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          
          <div className={styles.guideBox}>
            <p className={styles.guideText}>
              💡 <strong>지역, 건물 유형, 작업명, 사진</strong>을 보내주시면 상담이 빠릅니다.<br />
              📸 현장 사진이 있으면 견적 안내가 더욱 정확합니다.
            </p>
          </div>

          <div className={styles.btnGroup}>
            <a href={`tel:${CONTACT_PHONE}`} className={styles.phoneBtn}>
              <span className={styles.icon}>📞</span> 실시간 전화 상담
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
