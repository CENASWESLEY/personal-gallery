# Validation record

ตรวจเมื่อ 31 ตุลาคม 2026

## Automated checks

- `npm run typecheck` ผ่าน
- `npm run build` สร้าง static export สำเร็จ
- Dependency audit หลังอัปเดต sharp เป็น 0.35.5 ไม่พบ vulnerability
- ภาพ WebP 20 ภาพและ thumbnail 20 ภาพ รวมประมาณ 1.8 MB

## Browser checks

ทดสอบด้วย browser จริงบน production static export:

- หน้าหลักตอบ HTTP 200
- หน้าจอ 375, 768, 1024 และ 1440 px ไม่มี horizontal overflow
- กด Break/Rebuild glass แล้วสถานะและรูปแบบชิ้นกระจกเปลี่ยน
- สลับ light/dark theme
- ตัวกรอง Daylight แสดงเฉพาะ City in motion และ Off the clock
- สลับ Grid/List แล้ว layout เปลี่ยน
- เปิด Event แล้วเห็นภาพใน native modal
- Previous จากภาพแรกวนไปภาพสุดท้าย
- Next และปุ่มลูกศรบน keyboard เปลี่ยนภาพและ counter
- Thumbnail เลือกภาพได้
- Zoom และ original color เปลี่ยนสถานะถูกต้อง
- Slideshow เดินภาพอัตโนมัติ และ Pause หยุดสถานะเล่น
- Escape ปิด viewer, คืน focus ให้ปุ่มเปิด และคืน body scrolling
- เมนูมือถือเปิดได้และปิดเมื่อเลือก section
- Contact placeholder แสดง coming soon เมื่อไม่มีข้อมูลจริง
- Browser console ไม่พบ error หรือ warning ระหว่าง smoke test

ตรวจ implementation ของ reduced-motion stylesheet แล้ว
การปัดด้วย touch มี implementation แต่ยังไม่ได้ทดสอบบนเครื่องมือถือจริง
การตรวจนี้ไม่ใช่การรับรอง WCAG อย่างเป็นทางการ
