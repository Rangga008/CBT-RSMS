/**
 * Shared scoring utilities untuk CBT RSMS.
 * Mendukung: PG, PG_KOMPLEKS (parsial + penalti), BS (parsial), JODOH (parsial), Esai (manual).
 */

export function stripHtml(str) {
	return String(str || "")
		.replace(/<[^>]*>/g, "")
		.trim();
}

/**
 * Hitung nilai otomatis berdasarkan jawaban siswa vs kunci jawaban.
 * @param {Array} questions  - Array soal lengkap (dengan correctAnswer, options, type, bobot)
 * @param {Object} answers   - Map questionId -> jawaban siswa
 * @returns {{ score, totalWeight, earnedWeight, hasEssay, detail }}
 */
export function calculateScore(questions, answers) {
	let totalWeight = 0;
	let earnedWeight = 0;
	let hasEssay = false;
	const detail = [];

	for (const q of questions) {
		if (q.type === "Esai") {
			hasEssay = true;
			detail.push({
				questionId: q.id,
				type: "Esai",
				isCorrect: null,
				pointEarned: 0,
				bobot: q.bobot ?? 1,
			});
			continue;
		}

		const bobot = typeof q.bobot === "number" ? q.bobot : 1;
		totalWeight += bobot;

		const studentAnswer = answers[q.id];
		let isCorrect = false;
		let ratio = 0;

		if (q.type === "PG") {
			// correctAnswer is stored as option index (e.g. "0"), student answer is option text
			let key = "";
			const correctIdx = parseInt(q.correctAnswer);
			if (
				!isNaN(correctIdx) &&
				Array.isArray(q.options) &&
				q.options[correctIdx] !== undefined
			) {
				key = stripHtml(String(q.options[correctIdx]));
			} else {
				key = stripHtml(q.correctAnswer);
			}
			const ans = stripHtml(studentAnswer);
			isCorrect =
				key !== "" && ans !== "" && ans.toLowerCase() === key.toLowerCase();
			ratio = isCorrect ? 1 : 0;
		} else if (q.type === "PG_KOMPLEKS") {
			const keyArr = Array.isArray(q.correctAnswer)
				? q.correctAnswer.map(stripHtml)
				: [];
			const ansArr = Array.isArray(studentAnswer)
				? studentAnswer.map(stripHtml)
				: [];
			if (keyArr.length > 0 && ansArr.length > 0) {
				let matches = 0;
				for (const k of keyArr) {
					if (ansArr.some((a) => a.toLowerCase() === k.toLowerCase()))
						matches++;
				}
				const wrong = ansArr.filter(
					(a) => !keyArr.some((k) => k.toLowerCase() === a.toLowerCase()),
				).length;
				ratio = Math.max(0, (matches - wrong) / keyArr.length);
				isCorrect = matches === keyArr.length && wrong === 0;
			}
		} else if (q.type === "BS") {
			const key = q.correctAnswer || {};
			const ans = studentAnswer || {};
			const statementCount = Array.isArray(q.options) ? q.options.length : 0;
			if (statementCount > 0) {
				let correct = 0;
				for (let i = 0; i < statementCount; i++) {
					if (String(ans[i] || "") === String(key[i] || "")) correct++;
				}
				ratio = correct / statementCount;
				isCorrect = correct === statementCount;
			}
		} else if (q.type === "JODOH") {
			// Filter out distractors (entries with empty q — only appear as answer options)
			const pairs = Array.isArray(q.options)
				? q.options.filter((p) => p.q)
				: [];
			const ans = studentAnswer;
			if (pairs.length > 0 && ans && typeof ans === "object") {
				let matches = 0;
				for (const pair of pairs) {
					if (String(ans[pair.q] || "").trim() === String(pair.a).trim())
						matches++;
				}
				ratio = matches / pairs.length;
				isCorrect = matches === pairs.length;
			}
		}

		const pointEarned = bobot * ratio;
		earnedWeight += pointEarned;
		detail.push({
			questionId: q.id,
			type: q.type,
			isCorrect,
			ratio,
			pointEarned,
			bobot,
		});
	}

	const score =
		totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
	return { score, totalWeight, earnedWeight, hasEssay, detail };
}
