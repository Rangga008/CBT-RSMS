/**
 * Script untuk membuat icon PNG/ICO sederhana tanpa dependencies eksternal
 * Jalankan: node scripts/create-icons.js
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ASSETS_DIR = path.join(__dirname, "../assets");
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

// ─── CRC32 ────────────────────────────────────────────────────────────────────
const crcTable = (() => {
	const t = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		t[i] = c;
	}
	return t;
})();

function crc32(buf) {
	let c = 0xffffffff;
	for (let i = 0; i < buf.length; i++)
		c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
}

// ─── PNG Builder ──────────────────────────────────────────────────────────────
function makeChunk(type, data) {
	const len = Buffer.alloc(4);
	len.writeUInt32BE(data.length);
	const typeBuf = Buffer.from(type, "ascii");
	const crcBuf = Buffer.alloc(4);
	crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
	return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPNG(size, bgR, bgG, bgB, textR, textG, textB) {
	// IHDR
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(size, 0);
	ihdr.writeUInt32BE(size, 4);
	ihdr[8] = 8;
	ihdr[9] = 2; // 8-bit RGB

	// Draw simple colored square with "CBT" text approximation (pixel art)
	const rows = [];
	const margin = Math.floor(size * 0.1);
	const radius = Math.floor(size * 0.15);

	for (let y = 0; y < size; y++) {
		const row = Buffer.alloc(1 + size * 3);
		row[0] = 0;
		for (let x = 0; x < size; x++) {
			// Rounded corner check
			const inCorner =
				(x < margin + radius &&
					y < margin + radius &&
					(x - margin - radius) ** 2 + (y - margin - radius) ** 2 >
						radius ** 2) ||
				(x > size - margin - radius - 1 &&
					y < margin + radius &&
					(x - (size - margin - radius - 1)) ** 2 + (y - margin - radius) ** 2 >
						radius ** 2) ||
				(x < margin + radius &&
					y > size - margin - radius - 1 &&
					(x - margin - radius) ** 2 + (y - (size - margin - radius - 1)) ** 2 >
						radius ** 2) ||
				(x > size - margin - radius - 1 &&
					y > size - margin - radius - 1 &&
					(x - (size - margin - radius - 1)) ** 2 +
						(y - (size - margin - radius - 1)) ** 2 >
						radius ** 2);
			const inRect =
				x >= margin && x < size - margin && y >= margin && y < size - margin;

			if (inRect && !inCorner) {
				row[1 + x * 3] = bgR;
				row[1 + x * 3 + 1] = bgG;
				row[1 + x * 3 + 2] = bgB;
			} else {
				row[1 + x * 3] = 30;
				row[1 + x * 3 + 1] = 30;
				row[1 + x * 3 + 2] = 46; // bg dark
			}
		}
		rows.push(row);
	}

	const rawData = Buffer.concat(rows);
	const idat = zlib.deflateSync(rawData);

	const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
	return Buffer.concat([
		PNG_SIG,
		makeChunk("IHDR", ihdr),
		makeChunk("IDAT", idat),
		makeChunk("IEND", Buffer.alloc(0)),
	]);
}

// ─── ICO Builder ─────────────────────────────────────────────────────────────
function createICO(pngBuffer) {
	// ICO header (6 bytes) + 1 ICONDIRENTRY (16 bytes) + PNG data
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: 1 = ICO
	header.writeUInt16LE(1, 4); // count: 1 image

	const entry = Buffer.alloc(16);
	entry[0] = 0; // width 0 = 256
	entry[1] = 0; // height 0 = 256
	entry[2] = 0; // color count
	entry[3] = 0; // reserved
	entry.writeUInt16LE(1, 4); // planes
	entry.writeUInt16LE(32, 6); // bit count
	entry.writeUInt32LE(pngBuffer.length, 8); // size
	entry.writeUInt32LE(22, 12); // offset (6 header + 16 entry)

	return Buffer.concat([header, entry, pngBuffer]);
}

// ─── Generate ─────────────────────────────────────────────────────────────────
console.log("Membuat icon CBT RSMS...");

// 256x256 icon (biru #2b369e)
const icon256 = createPNG(256, 43, 54, 158, 255, 255, 255);
fs.writeFileSync(path.join(ASSETS_DIR, "icon.png"), icon256);
console.log("✅ assets/icon.png (256x256)");

// ICO dari PNG yang sama
fs.writeFileSync(path.join(ASSETS_DIR, "icon.ico"), createICO(icon256));
console.log("✅ assets/icon.ico");

// 16x16 tray icon (lebih kecil)
const icon16 = createPNG(16, 43, 54, 158, 255, 255, 255);
fs.writeFileSync(path.join(ASSETS_DIR, "tray-icon.png"), icon16);
console.log("✅ assets/tray-icon.png (16x16)");

console.log("\n✅ Semua icon berhasil dibuat di folder assets/");
