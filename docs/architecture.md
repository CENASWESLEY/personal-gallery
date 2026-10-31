# MARK. architecture

## Content boundaries

`curation.json` แยกการคัดภาพและ presentation layout ออกจากข้อมูลเหตุการณ์จริง
`event-details.ts` เก็บเฉพาะรายละเอียดที่ยืนยันจากเจ้าของได้
`prepare-images.mjs` อ่านโฟลเดอร์, ตรวจ order ครบทุกภาพ และสร้าง
`photographs.json` พร้อม asset URLs, dimensions และ source filename
`gallery.ts` ประกอบข้อมูลเป็น domain types สำหรับ UI

ไม่มีการใช้ EXIF หรือเวลาแก้ไขไฟล์มาแต่งข้อมูลเหตุการณ์
ลำดับโฟลเดอร์คือ timeline; ลำดับภาพในโฟลเดอร์คือ editorial curation

## State ownership

- `GalleryExperience`: shared viewer selection และ theme
- `useMirrorOrbit`: rotation, drag gesture และ playback lifecycle
- `CollectionArchive`: expanded state และเลขหน้าของแต่ละชุดอย่างอิสระ
- `PhotoViewer`: image index, zoom และ slideshow ภายใน native dialog

วงกระจกใช้ refs และ CSS transforms เพื่อหลีกเลี่ยง React render ทุกเฟรม
CSS clip-path ให้แต่ละชิ้นมีรูปตัวเองและขอบสะท้อน ใช้ WebGL ไม่จำเป็น
ResizeObserver คำนวณวงโคจรใหม่ให้ตรงขนาดจอ
IntersectionObserver และ document visibility ป้องกันการอัปเดตตำแหน่งนอกจอ

## Access to every image

ภาพนำเป็นเพียง curated preview ไม่ใช่ archive ทั้งหมด
แต่ละชุดมีกริด 8 ภาพต่อหน้า และ viewer ที่ jump ไปภาพใดก็ได้
thumbnail ใช้ overflow scroll และ scroll selected item into view
ResizeObserver รักษา active thumbnail ให้อยู่ในจอเมื่อหมุน/resize อุปกรณ์

## Styling and delivery

`src/styles/` แยก base, hero, collections, about, viewer และ responsive
chapter แต่ละชุดใช้ modifier class ของตัวเองเพื่อเปลี่ยน composition
CSS ไม่มี grayscale หรือ color grading สำหรับรูปภาพ
Native dialog จัดการ focus containment และ Escape; cleanup คืน focus/scroll
Next.js static export ทำให้ไม่ต้องมี backend หรือ secrets
ภาพ optimize ก่อน deploy และ EXIF ถูกลบจากไฟล์ที่สร้าง
