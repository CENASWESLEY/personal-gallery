# FRAGMENTS — A Personal Gallery

เว็บไซต์แกลเลอรีส่วนตัวด้วย **Next.js App Router + TypeScript + React** ธีมขาว–ดำ
ใช้ภาพจริง 20 ภาพจากโฟลเดอร์ต้นฉบับ พร้อมข้อมูล Event แบบ mock ที่แก้ไขได้

## เริ่มใช้งาน

ต้องการ Node.js 20.9 ขึ้นไป

```powershell
cd D:\Photo\fragments
npm install
npm run dev
```

เปิด http://127.0.0.1:3000

```powershell
npm run typecheck  # ตรวจ TypeScript
npm run build      # สร้าง static website ลง out/
```

ใช้ `npm run dev` ระหว่างพัฒนา (โปรเจกต์นี้เป็น static export)
หรือนำ `out/` ไปวางบน static hosting เช่น Sites, Cloudflare Pages หรือ Netlify

## แก้ไขข้อมูลและ Event

ไฟล์หลัก: **`src/data/gallery.ts`**

- `profile`: ข้อความแนะนำตัว, อีเมล, URL Instagram
- `photographs`: ชื่อภาพ, alt text, ตำแหน่ง crop (`position`)
- `collections`: ชื่อ Event, คำอธิบาย, หมวดหมู่, ภาพปก, ลำดับภาพ
- ชื่อคอลเลกชันเป็นชื่อสมมติเพื่อจัดกลุ่มตามชุด ไม่มีการอ้างวันที่หรือสถานที่จริง

ตัวอย่างการเพิ่ม Event:

```ts
{
  id: "my-new-event", // ไม่ซ้ำกัน; ใช้อักษรอังกฤษและขีดกลาง
  number: "05",
  title: "My new chapter",
  subtitle: "A NEW PERSPECTIVE",
  category: "Daylight", // หรือ "After hours"
  cover: "01", // ID ใน photographs
  description: "ใส่เรื่องราวของชุดนี้ที่นี่",
  photos: ["01", "03"].map(id => photographs[id]),
}
```

จำนวนภาพ จำนวนคอลเลกชัน และตัวเลขในตัวกรองคำนวณจากข้อมูลอัตโนมัติ

หากเพิ่ม `profile.email` ปุ่มวงกลมใน Footer จะแสดงลิงก์อีเมล
หากยังไม่ใส่ข้อมูล จะแสดงข้อความ coming soon

## เปลี่ยนรูป

รูปที่เว็บใช้เก็บอยู่ใน `public/photos/` เป็น WebP:

- `01.webp`–`20.webp`: ภาพสำหรับแสดงผล
- `01-thumb.webp`–`20-thumb.webp`: ภาพย่อใน viewer

แทนไฟล์เดิมด้วยภาพใหม่ชื่อเดิม หรือเพิ่ม reference ใหม่ใน `photographs`
ถ้าต้องการสร้าง WebP ใหม่จากไฟล์ต้นฉบับในโฟลเดอร์แม่:

```powershell
npm run prepare:images
```

สคริปต์ `scripts/prepare-images.mjs` ผูกชื่อไฟล์ต้นฉบับกับ ID ภาพ
ปรับรายการ `originals` เมื่อเปลี่ยนไฟล์ต้นฉบับ สคริปต์ไม่แก้รูปต้นฉบับ
และลบ EXIF ออกจากไฟล์ที่สร้างเพื่อลดข้อมูลส่วนตัวที่ไม่จำเป็น

## โครงสร้างโมดูล

```text
src/
  app/                 หน้าเว็บ, metadata, favicon และ design tokens/CSS
  components/
    GalleryExperience  ประสาน theme และสถานะ viewer
    layout/            Header และเมนูมือถือ
    hero/              Hero และประติมากรรมกระจกแตก
    collections/       ตัวกรอง, grid/list, การ์ด Event
    viewer/            หน้าดูภาพเต็มจอ
    about/             เกี่ยวกับตัวเองและ Footer
    ui/                SVG icons
  data/                ข้อมูลส่วนตัวและคอลเลกชัน
  hooks/               IntersectionObserver scroll reveal
  types/               TypeScript domain interfaces
scripts/               เครื่องมือเตรียมภาพ
public/
  photos/              WebP ที่ optimize แล้ว
  fonts/               ฟอนต์ local พร้อม OFL licenses
```

Exported component, hook และ domain interface มี TSDoc/JSDoc
อธิบายหน้าที่และพฤติกรรมสำคัญใกล้กับโค้ด

## ประสบการณ์การดูภาพ

- Hover หรือกด **Break the glass** เพื่อแยกชิ้นกระจก
- เลือก Event เพื่อเปิด modal viewer แบบ native `<dialog>`
- ปุ่มลูกศรหรือแป้นพิมพ์ ← → ใช้เปลี่ยนภาพ วนภายใน Event
- เลือก thumbnail เพื่อไปยังภาพที่ต้องการ
- บนมือถือปัดภาพไปซ้ายหรือขวาเพื่อเปลี่ยนภาพ
- คลิกภาพหรือปุ่มแว่นขยายเพื่อซูม; เมาส์เลื่อนจุดมองเมื่อซูม
- สลับภาพ monochrome กับสีต้นฉบับ
- Slideshow เปลี่ยนภาพทุก 4.2 วินาที และหยุดเดินเมื่อแท็บถูกซ่อน
- Escape หรือปุ่มปิดจะคืน focus และ scroll ไปยังจุดเดิม
- Theme บันทึกใน localStorage; ใช้ได้แม้ browser ปิด storage

## Accessibility และ performance

Native dialog จัดการ focus containment, ปุ่มมี accessible labels,
รองรับคีย์บอร์ด, skip link, visible focus และ `prefers-reduced-motion`
แอนิเมชันใช้ CSS transform/opacity, scroll progress ใช้ requestAnimationFrame,
ภาพนอกจอ lazy load และรูปภาพทั้งหมดถูกย่อขนาดไว้ล่วงหน้า
ฟอนต์ DM Sans และ Noto Sans Thai เก็บในโปรเจกต์พร้อมใบอนุญาต OFL
ไม่มี image API, external font CDN หรือฐานข้อมูลที่ต้องตั้งค่าเพิ่มเติม

## ปรับดีไซน์

แก้ design tokens ที่ต้น `src/app/globals.css` เช่น `--paper`, `--ink`,
`--line`, `--gutter` และ dark theme ใน selector `[data-theme="dark"]`
ตำแหน่งชิ้นกระจกแก้ที่ `facets` ใน `FracturedPortrait.tsx`
Hero portrait อ้างภาพ `05` และเปิด collection `the-black-edition`
หากเปลี่ยนภาพ Hero ควรเปลี่ยนทั้ง reference ใน component และ selection
ใน `GalleryExperience.tsx` ให้ตรงกัน

## การเผยแพร่

`.openai/hosting.json` ระบุ Sites project และ static directory `out`
การเผยแพร่ครั้งแรกกำหนดเป็น private เจ้าของบัญชีเข้าดูได้
ภาพต้นฉบับในโฟลเดอร์แม่ไม่อยู่ใน source หรือ deployment bundle
