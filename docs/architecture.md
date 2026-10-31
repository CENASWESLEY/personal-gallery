# Architecture decisions

## Content boundary

`Collection` และ `Photograph` เป็น domain types ที่ไม่ผูกกับ React
`src/data/gallery.ts` เป็นแหล่งข้อมูลหลักของภาพและ Event ทั้งหมด
component แสดงผลรับข้อมูลหรือ callback ผ่าน props จึงเปลี่ยนเป็น CMS
หรือ API ในภายหลังได้โดยรักษา interface เดิม

## Interaction ownership

`GalleryExperience` ดูแลสถานะที่ใช้ข้าม section: theme และ viewer selection
`Collections` ดูแล filter/layout เฉพาะของตัวเอง
`FracturedPortrait` ดูแลสถานะกระจกและ pointer tilt โดยไม่ rerender ทุกเฟรม
`PhotoViewer` ดูแลภาพปัจจุบัน, zoom, color และ slideshow ภายใน modal
ไม่มี global state library เพราะข้อมูลร่วมมีเพียงสองจุด

## Glass rendering

ใช้ภาพเดียวกันใน coordinate system เดียวกันและ clip เป็น polygon 7 ชิ้น
ขยับแต่ละชิ้นด้วย transform เพื่อคงรอยต่อและให้ GPU ช่วย composite
ไม่มี canvas หรือ WebGL ที่เพิ่มค่าใช้จ่ายในการโหลดและการเข้าถึง
ภาพซ้ำทั้ง 7 ชิ้นใช้ URL เดียวกัน browser จึง reuse network cache

## Static delivery

Next.js static export ทำให้เว็บทำงานบน static hosting ได้ทั้งหมด
รูป WebP และ thumbnails เตรียมล่วงหน้าโดย sharp
ไม่มี server actions, secrets, session หรือ backend ที่ต้องดูแล
`next/image` proxy จึงไม่จำเป็น รูปมีขนาดและ aspect ratio จองไว้ใน CSS

## Motion and resilience

ข้อมูลทั้งหมด render ใน HTML เริ่มต้น Scroll reveal จะซ่อนเนื้อหาเฉพาะ
เมื่อ observer พร้อมทำงานและเนื้อหาอยู่นอก viewport
reduced motion แสดงเนื้อหาใน final state และปิด animation ที่ไม่จำเป็น
theme persistence มี try/catch เพื่อรองรับ storage policy ของ browser
native dialog คืน focus ให้ตัวเปิดเมื่อปิดและป้องกัน background scrolling
