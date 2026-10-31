# MARK. — Supavit Mungmalee / Mark Cenas

Next.js App Router + TypeScript personal photo archive.
โครงเว็บขาว–ดำ ภาพทุกภาพเป็นสีต้นฉบับ พร้อม Gallery แบบเต็มจอ

## เริ่มต้น

```powershell
cd D:\Photo\fragments
npm install
npm run dev
```

เปิด http://127.0.0.1:3000 ใช้ Node.js 22 ขึ้นไปสำหรับ development และ tests
`npm run dev` สแกนคลังภาพก่อนเปิด และติดตามการเปลี่ยนรูปในโฟลเดอร์ระหว่างทำงาน

```powershell
npm test
npm run typecheck
npm run build
```

Build จะสแกนรูปก่อนอัตโนมัติ แล้วสร้าง static website ลง `out/`
เพิ่มรูปในเครื่องแล้วต้อง build และเผยแพร่ใหม่เพื่ออัปเดตเว็บออนไลน์
เว็บที่เผยแพร่ไม่สามารถอ่านดิสก์ D: ของเครื่องผู้ชมโดยตรง

## อัปเดตรูปและคอลเลกชัน

โฟลเดอร์รูปอยู่ที่ `D:\Photo` (ค่าเริ่มต้นคือโฟลเดอร์แม่ของโปรเจกต์)
กำหนดตำแหน่งอื่นได้ด้วย environment variable `MARK_PHOTO_ROOT`

- เพิ่ม/ลบรูปใน `Hightlight` ได้โดยไม่ต้องแก้จำนวนในโค้ด
- รองรับชื่อโฟลเดอร์ Highlight, Highlights, Hightlight หรือ Hightlights
- โฟลเดอร์ Event ขึ้นต้นด้วยเลข เช่น `10.New Event` จะถูกค้นพบอัตโนมัติ
- เปลี่ยนเลขหน้าโฟลเดอร์เพื่อเรียง timeline ใหม่ได้
- รองรับ JPG, JPEG, PNG, WebP และ AVIF
- จำนวนรูป, Overview, sidebar, Highlight และ viewer อ้างข้อมูลเดียวกัน
- ไฟล์ใหม่จะถูกเพิ่มท้ายลำดับภาพที่คัดไว้ โดยไม่ทำให้ ID รูปเดิมเปลี่ยน
- ลบรูปแล้ว reference ในเว็บจะหายตามเมื่อ sync; รูปต้นฉบับอื่นไม่ถูกแก้

หากต้องการ sync แยกจาก dev/build:

```powershell
npm run prepare:images
```

สคริปต์สร้าง WebP และ thumbnail พร้อมลบ EXIF โดยรักษาสีเดิม
มี cache เพื่อไม่ต้องประมวลผลไฟล์ที่ไม่เปลี่ยนซ้ำ
หาก build จาก checkout ที่ไม่มีโฟลเดอร์ต้นฉบับ จะใช้ manifest และ assets
ที่ commit ไว้สำหรับ deployment เดิม

## คัดภาพเด่นและรายละเอียด Event

`src/data/curation.json` เก็บชื่อ/คำบรรยาย/ลุค และ `preferredFiles`
ซึ่งเป็นรายชื่อไฟล์จริงตามลำดับที่อยากให้เด่นก่อน ไม่มีเลข index ที่เลื่อน
เมื่อเพิ่มไฟล์ใหม่ รายชื่อที่ถูกลบจะถูกข้าม ส่วนรูปใหม่ที่เหลือถูกเพิ่มอัตโนมัติ

`src/data/event-details.ts` เก็บข้อมูลเหตุการณ์ที่ยืนยันจากเจ้าของ:

```ts
export const eventDetails = {
  "cooperative-awards": {
    eventName: "ชื่อ Event",
    location: "สถานที่",
    date: "วัน เดือน ปี",
    time: "เวลา",
    story: "รายละเอียดเหตุการณ์",
    outfit: "รายละเอียดการแต่งตัว",
  },
};
```

ยังไม่เดาข้อมูลสถานที่หรือวันเวลา เมื่อไม่มีข้อมูลจะแสดง “รอระบุ”
เปลี่ยนข้อมูลส่วนตัวและ contact ที่ `src/data/gallery.ts`

## หน้าแรก 3 สไตล์

1. **Orbit** — กระจกวิ่งวน ลากหมุนได้
2. **Shatter** — กระจกออกจากด้านหลังของแบบแล้วแตกกระจายขึ้น มี Replay
3. **Flow** — แผ่นฟิล์มเคลื่อนเป็นเกลียวจากซ้ายล่างสู่ขวาบน รอบภาพหันหลัง

เลือกจากปุ่มใต้ชื่อหน้าแรก ระบบจำตัวเลือกใน browser ด้วย `mark-hero-style`
ทุกแบบมี pause/play, ปุ่มขยับ และเปิด Gallery จากชิ้นกระจกได้
เคารพ reduced motion และหยุดอัปเดตภาพเมื่ออยู่นอกจอหรือแท็บถูกซ่อน

## การนำเสนอคอลเลกชัน

- Overview เป็นการ์ดชุดภาพซ้อน กดแล้วเลื่อนไปยัง Event
- ทุก Event ใช้ `CollectionSection` และ `FeaturedPhotoGrid` ร่วมกัน
- ภาพเด่นสูงสุด 6 ภาพขนาดเท่ากัน ไม่มีกรอบ
- Desktop: 3 คอลัมน์ × 2 แถว / Mobile: 2 คอลัมน์ × 3 แถว
- หากต้นฉบับมีไม่ถึง 6 รูป จะแสดงเฉพาะรูปจริงโดยไม่ทำภาพซ้ำ
- กริดภาพทั้งหมดแบ่งหน้า และ viewer เลือกข้ามไปภาพใดก็ได้
- Floating navigation ด้านขวาแสดงเลข/ชื่อ/ชุดปัจจุบันและกลับ Overview
- Mobile แสดงเป็นปุ่มลอยเล็ก เปิดเป็นเมนูที่เลื่อนได้ รองรับคลังขนาดใหญ่

## โครงสร้างสำคัญ

```text
scripts/
  dev.mjs                    Local preview + source-folder watcher
  prepare-images.mjs         Build-time photo sync entry point
  lib/photo-library.mjs      Discovery, stable IDs, optimization, cache
src/
  components/
    hero/                    Style picker + shared mirror scene
    collections/
      CollectionOverview     Photo folder directory
      CollectionSection      Shared chapter structure
      FeaturedPhotoGrid      Shared borderless six-photo grid
      CollectionArchive      Paginated complete archive
      Highlights             Dynamic favorites reel
    layout/
      CollectionNavigation   Floating desktop/mobile chapter index
    viewer/                  Full-screen gallery
  data/
    photographs.json         Generated manifest; do not edit directly
    curation.json            Preferred filenames and editorial metadata
    event-details.ts         Confirmed facts
  lib/mirror-layout.ts       Testable geometry for all 3 hero modes
  hooks/useMirrorOrbit.ts    Pointer/playback lifecycle
  styles/                    Feature CSS and shared library styles
tests/                       Library growth/ID and choreography checks
```

ภาพ Hero แยกพื้นหลังเตรียมไว้แล้ว ดู provenance ใน `docs/asset-notes.md`
ข้อมูล Event ที่รอเติมอยู่ใน `docs/event-details-template.md`
Sites ใช้ project และ audience ส่วนตัวเดิม
