# MARK. — Supavit Mungmalee / Mark Cenas

เว็บไซต์แกลเลอรีส่วนตัว Next.js App Router + TypeScript
ใช้ภาพสีต้นฉบับ 127 รูปจาก 10 คอลเลกชัน และ 20 รูปในโฟลเดอร์ `Hightlight`
โครงเว็บเป็นขาว–ดำ แต่ไม่มีการเปลี่ยนสีภาพเป็น monochrome

## เปิดโปรเจกต์

```powershell
cd D:\Photo\fragments
npm install
npm run dev
```

เปิด http://127.0.0.1:3000 ใช้ Node.js 20.9 ขึ้นไป

```powershell
npm run typecheck
npm run build
```

Static export สร้างลง `out/` สำหรับ Sites หรือ static hosting อื่น

## ข้อมูลที่รอเจ้าของเติม

แก้ **`src/data/event-details.ts`** โดยใช้ collection ID:

```ts
export const eventDetails = {
  "cooperative-awards": {
    eventName: "ชื่อเหตุการณ์จริง",
    location: "ชื่อสถานที่",
    date: "วัน เดือน ปี",
    time: "เวลา",
    story: "รายละเอียดของเหตุการณ์",
    outfit: "รายละเอียดชุดที่ต้องการแสดง",
  },
};
```

ยังไม่มีการเดาวันเวลา/สถานที่จากรูป ป้ายสถานที่และวันเวลาจะแสดงรอระบุ
ชื่อคอลเลกชันปัจจุบันอิงชื่อโฟลเดอร์ ส่วนรายละเอียดชุดอิงสิ่งที่เห็นในภาพ

| ลำดับ | Collection ID           | โฟลเดอร์             | จำนวน | รูปแบบนำเสนอ  |
| ----- | ----------------------- | -------------------- | ----: | ------------- |
| 01    | cooperative-awards      | 1.รับรางวัลสหกิจ     |     6 | Editorial     |
| 02    | cooperative-competition | 2.ประกวดสหกิจ        |     4 | Stage         |
| 03    | graduation              | 3.รับปริญญา          |    20 | Filmstrip     |
| 04    | black-suit              | 4.สูทดำ              |    13 | Noir          |
| 05    | white-suit              | 5.สูทขาว             |     9 | Diptych       |
| 06    | bkk-challenge           | 6.BKK challenge      |     9 | Panorama      |
| 07    | coeidol                 | 6.COEIDOL            |    14 | Mosaic        |
| 08    | cafe-bkk-challenge      | 7.Cafe BKK Challenge |     6 | Cinema        |
| 09    | white-shirt             | 8.White Shirt        |    23 | Lookbook      |
| 10    | blue-shirt              | 9.Blue Shirt         |    23 | Contact sheet |

เลข 6 ซ้ำสองโฟลเดอร์ จึงรักษาลำดับชื่อ BKK challenge ก่อน COEIDOL
การเรียง timeline ใช้ลำดับโฟลเดอร์ ส่วนการเรียงภาพในแต่ละชุดคัดจาก
ความชัดเจนของใบหน้า ท่าโพส และองค์ประกอบภาพ เป็น editorial choice ที่แก้ได้

## โครงสร้างไฟล์

```text
src/
  app/                 Entry point, metadata, favicon, CSS imports
  components/
    hero/              MirrorOrbit, Hero
    collections/       Highlights, Collections, CollectionArchive, PhotoTile
    viewer/            PhotoViewer — zoom, slideshow, jump-to-frame
    about/             ชื่อจริง ที่มาชื่อ Mark Cenas และ contact
    layout/            Header และ mobile menu
    ui/                SVG icons
  data/
    gallery.ts         Identity, contact และประกอบข้อมูลแต่ละชุด
    curation.json      ลำดับโฟลเดอร์/ภาพและรูปแบบ layout
    event-details.ts   ข้อมูลเหตุการณ์จริงที่รอเติม
    photographs.json   Asset manifest ที่สร้างอัตโนมัติ
  hooks/               useMirrorOrbit และ useReveal
  styles/              แยก CSS ตาม feature และ responsive overrides
  types/               Domain interfaces พร้อม TSDoc
public/
  archive/             ภาพ WebP และ thumbnails สีต้นฉบับ
  images/              Hero cutout และโลโก้ที่เจ้าของให้
  fonts/               Local fonts พร้อม OFL licenses
scripts/
  prepare-images.mjs   Import/optimize จากโฟลเดอร์รูปเดิม
```

## เปลี่ยนรูปและลำดับภาพ

`src/data/curation.json` กำหนดโฟลเดอร์, ชื่อเริ่มต้น, ชุด, layout, ลำดับภาพ
ตัวเลขใน `order` อ้างตำแหน่ง 1-based ของไฟล์ที่เรียงชื่อตามตัวอักษร
ต้องใส่ทุกภาพครั้งเดียว สคริปต์ตรวจความครบถ้วนก่อน import

```powershell
npm run prepare:images
```

สคริปต์อ่านต้นฉบับจากโฟลเดอร์แม่ (`D:\Photo`) ไม่แก้ไฟล์เดิม
รูปที่เผยแพร่ถูกย่อเป็น WebP พร้อมลบ EXIF และคงสีเดิม
หลังเปลี่ยน order ต้องรันสคริปต์ใหม่เพื่อสร้าง manifest ให้ตรงกัน

## การดูภาพจำนวนมาก

- Global Highlight reel แสดงครบ 20 ภาพและเปิด viewer ได้
- ทุกคอลเลกชันมี Chapter Highlights ก่อนส่วนภาพทั้งหมด
- ปุ่มดูทั้งหมดเปิดกริดครั้งละ 8 ภาพ มีเลขหน้าและจำนวนภาพชัดเจน
- Viewer มี dropdown เลือกภาพโดยตรง, thumbnail ที่เลื่อนได้,
  ปุ่มก่อนหน้า/ถัดไป, keyboard arrows, zoom และ slideshow
- ภาพย่อที่เลือกจะเลื่อนเข้ามาในพื้นที่ที่มองเห็น รวมถึงหลัง resize
- Escape ปิด viewer และคืน focus ให้ปุ่มเดิม

## วงกระจกหน้าแรก

1 ชิ้นกระจก = 1 รูปจากแต่ละคอลเลกชัน ต่างจากภาพเดียวที่ถูกซอยเป็นหลายชิ้น
มีวงโคจรอัตโนมัติ, drag, ปุ่มหมุนทีละช่วง, pause/play และปุ่มเปิด Gallery
หยุดเคลื่อนไหวเมื่อ hover/focus, อยู่นอกจอ หรือ browser ถูกซ่อน
เมื่อระบบตั้ง reduced motion จะเริ่มต้นเป็นหยุดหมุน
ภาพกลางเป็น cutout เตรียมจากภาพสูทดำ ดู provenance ใน `docs/asset-notes.md`

## Theme และ contact

แก้ข้อมูลส่วนตัวที่ `profile` ใน `src/data/gallery.ts`
Instagram: `supavit_mu` / Email: `supavit.mu@gmail.com`
Theme บันทึกด้วย key `mark-theme` และมี fallback หาก storage ไม่พร้อม
ฟอนต์เป็น local assets ไม่มี external font CDN

ลิงก์ Sites เดิมคงอยู่เพื่อรักษา project/access เดิม แต่ชื่อเว็บไซต์และ
metadata เปลี่ยนเป็น MARK. แล้ว การเผยแพร่ยังเป็น private ของเจ้าของบัญชี
