import os
import subprocess

DOWNLOADS_DIR = os.path.abspath("public/downloads")
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CSS_STYLES = """
@page {
  size: A4;
  margin: 1.2cm 1.4cm;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Noto Sans Devanagari", "Kohinoor Devanagari", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
  line-height: 1.55;
  margin: 0;
  padding: 0;
  background: #ffffff;
  font-size: 11pt;
}
.header {
  border-bottom: 2px solid #b45309;
  padding-bottom: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand-title {
  font-size: 18pt;
  font-weight: 800;
  color: #78350f;
  margin: 0;
}
.brand-sub {
  font-size: 10pt;
  color: #92400e;
  font-weight: 600;
}
.doc-title {
  font-size: 16pt;
  font-weight: 800;
  color: #0f766e;
  margin: 16px 0 6px 0;
}
.doc-sa {
  font-size: 13pt;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 12px;
}
.section-title {
  font-size: 13pt;
  font-weight: 700;
  color: #1e3a8a;
  border-bottom: 1.5px solid #cbd5e1;
  padding-bottom: 4px;
  margin-top: 22px;
  margin-bottom: 10px;
}
.box {
  background: #fdfbf7;
  border: 1px solid #e2d9cc;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0 18px 0;
  font-size: 9.5pt;
}
th, td {
  border: 1px solid #cbd5e1;
  padding: 6px 10px;
  text-align: left;
}
th {
  background: #f1f5f9;
  color: #0f172a;
  font-weight: 700;
}
tr:nth-child(even) {
  background: #f8fafc;
}
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 8.5pt;
  font-weight: 700;
  background: #fef3c7;
  color: #92400e;
  margin-right: 6px;
}
.q-block {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e2e8f0;
}
.q-title {
  font-weight: 700;
  color: #0f172a;
}
.q-ans {
  color: #166534;
  background: #f0fdf4;
  border-left: 3px solid #22c55e;
  padding: 4px 10px;
  margin-top: 4px;
  font-size: 10pt;
}
.footer {
  margin-top: 30px;
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;
  font-size: 8.5pt;
  color: #64748b;
  text-align: center;
}
.page-break {
  page-break-after: always;
}
"""

def generate_pdf(html_content, output_pdf_name):
    temp_html = f"/tmp/{output_pdf_name}.html"
    output_pdf = os.path.join(DOWNLOADS_DIR, output_pdf_name)
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    cmd = [
        CHROME_BIN,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--user-data-dir=/tmp/chrome_pdf_dir",
        f"--print-to-pdf={output_pdf}",
        f"file://{temp_html}"
    ]
    subprocess.run(cmd, check=True)
    size_kb = os.path.getsize(output_pdf) / 1024
    print(f"Generated {output_pdf_name}: {size_kb:.1f} KB")

# 1. Question Bank
html_qb = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>CBSE Class 7 Sanskrit Deepakam Master Question Bank & Solutions</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">NCERT · CBSE Class 7 Academic Study Vault</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>Deepakam Class 7</strong><br>Complete Solved Bank
  </div>
</div>

<div class="doc-title">NCERT Deepakam Class 7 Sanskrit: Master Question Bank & Solutions</div>
<div class="doc-sa">सप्तम-कक्षायाः दीपकम-पाठ्यपुस्तकस्य प्रश्नकोशः सविस्तर-समाधानम् च</div>

<div class="box">
  <strong>विषय-सूची एवं परीक्षा-संक्षेपः (Syllabus & Blueprint Overview):</strong><br>
  This master solved guide covers all foundational chapters of NCERT Deepakam for Class 7 CBSE Sanskrit: verse-by-verse anvaya, word meanings, sandhi splits, and model exam questions with verified answer keys for term assessments.
</div>

<div class="section-title">प्रथमः पाठः — वन्दे भारतमातरम् (Chapter 1: Salutations to Mother India)</div>
<div class="q-block">
  <div class="q-title">१. श्लोकः अन्वयः च (Verse 1 & Prose Order):</div>
  <p><em>वन्दे भारतमातरम्। धवलाम्बुजवासिनीं ज्ञानप्रदां सुभाषिणीम्॥</em><br>
  <strong>अन्वयः:</strong> धवलाम्बुजवासिनीं ज्ञानप्रदां सुभाषिणीं भारतमातरम् (अहं) वन्दे।</p>
  <div class="q-ans"><strong>हिन्दी/English अर्थः:</strong> मैं श्वेत कमल पर विराजित, ज्ञान देने वाली, मधुर भाषिणी भारतमाता की वन्दना करता हूँ। (I bow to Mother India who dwells on a white lotus, who bestows knowledge and speaks melodiously.)</div>
</div>

<div class="q-block">
  <div class="q-title">२. एकपदेन उत्तरत (Answer in One Word):</div>
  <p>(क) भारतमाता कीदृशी अस्ति? ➔ <span style="color:#166534; font-weight:700;">धवलाम्बुजवासिनी / ज्ञानप्रदा</span><br>
  (ख) वयम् कां वन्दामहे? ➔ <span style="color:#166534; font-weight:700;">भारतमातरम्</span><br>
  (ग) 'अम्बुजम्' इत्यस्य पदस्य कः अर्थः? ➔ <span style="color:#166534; font-weight:700;">कमलम् (Lotus)</span></p>
</div>

<div class="section-title">द्वितीयः पाठः — नित्यं पिबामः सुभाषितरसम् (Chapter 2: Subhashitas)</div>
<div class="q-block">
  <div class="q-title">१. श्लोक-व्याख्या (Verse Analysis):</div>
  <p><em>पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते॥</em></p>
  <div class="q-ans"><strong>समाधानम् (Solution):</strong> पृथिव्यां वास्तविकानि त्रीणि रत्नानि सन्ति—जलम्, अन्नम्, सुभाषितं च। परन्तु अज्ञानान्धकारावृताः मूढाः जनाः प्रस्तरखण्डेषु (मणिरत्नादिषु) एव रत्नसंज्ञां कुर्वन्ति।</div>
</div>
<div class="q-block">
  <div class="q-title">२. सन्धि-विच्छेदं कुरुत (Split the Sandhi):</div>
  <p>• जलमन्नम् = <strong>जलम् + अन्नम्</strong><br>
  • रत्नसंज्ञा = <strong>रत्न + संज्ञा</strong><br>
  • मूढैः + पाषाणखण्डेषु = <strong>मूढैः पाषाणखण्डेषु</strong> (विसर्गसन्धिः)</p>
</div>

<div class="section-title">तृतीयः पाठः — मित्राय नमः (Chapter 3: Friendship & Panchatantra)</div>
<div class="q-block">
  <div class="q-title">१. पूर्णवाक्येन उत्तरत (Answer in Full Sentence):</div>
  <p><strong>प्रश्नः:</strong> सच्चा मित्रः कदा सहायको भवति?<br>
  <div class="q-ans"><strong>उत्तरम्:</strong> आपत्काले, व्यसने, दुर्भिक्षे, राजद्वारे श्मशाने च यः तिष्ठति सः एव सच्चा मित्रः भवति। (A true friend stands by in adversity, crisis, famine, court, and grief.)</div></p>
</div>

<div class="section-title">चतुर्थः पाठः — न लभ्यते चेत् आम्लं द्राक्षाफलम् (Chapter 4: The Grapes are Sour)</div>
<div class="q-block">
  <div class="q-title">१. कथा-सारः व्याकरणं च (Story Analysis & Grammar):</div>
  <p>• पिपासितः शृगालः वने भ्रमति। (The thirsty fox wanders in the forest.)<br>
  • <strong>'पिपासितः'</strong> पदे प्रत्ययः कः? ➔ <strong>क्त-प्रत्ययः</strong> (पिपासा + क्त)<br>
  • <strong>'द्राक्षाफलम्'</strong> कस्य वर्णस्य अस्ति? ➔ कृष्णस्य / हरितस्य वा। शृगालः कथयति—'आम्लं द्राक्षाफलम्' (The grapes are sour).</p>
</div>

<div class="section-title">व्याकरण-अभ्यासः (CBSE Applied Grammar Master Drills)</div>
<table>
  <tr><th>शब्दः (Stem)</th><th>विभक्तिः</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th></tr>
  <tr><td>बालक (Boy)</td><td>तृतीया</td><td>बालकेन</td><td>बालकाभ्याम्</td><td>बालकैः</td></tr>
  <tr><td>लता (Creeper)</td><td>पञ्चमी</td><td>लतायाः</td><td>लताभ्याम्</td><td>लताभ्यः</td></tr>
  <tr><td>फल (Fruit)</td><td>प्रथमा</td><td>फलम्</td><td>फले</td><td>फलानि</td></tr>
  <tr><td>अस्मद् (I/We)</td><td>द्वितीया</td><td>माम् / मा</td><td>आवाम् / नौ</td><td>अस्मान् / नः</td></tr>
</table>

<div class="footer">
  EdNet Learn Gurukul Academic Study Vault · www.ednetlearn.in · Free Printable Revision Guide
</div>
</body>
</html>"""

# 2. Shabdroop & Dhaturoop Cheat Sheet
html_cheat_sheet = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>The 100 Most Frequent Shabdroop & Dhaturoop Master Cheat Sheet</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">Grammar Essentials · High-Yield Formula Chart</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>CBSE Classes 6–10</strong><br>Shabdroop &amp; Dhaturoop
  </div>
</div>

<div class="doc-title">Top 100 Shabdroop & Dhaturoop Master Revision Sheet</div>
<div class="doc-sa">शत-प्रमुखाणां शब्दरूपाणां धातुरूपाणां च सूत्र-सारणी</div>

<div class="section-title">१. पुंल्लिङ्ग-शब्दाः (Masculine Noun Declensions)</div>
<table>
  <tr><th>विभक्तिः</th><th>बालक (अकारान्त)</th><th>हरि (इकारान्त)</th><th>गुरु (उकारान्त)</th><th>पितृ (ऋकारान्त)</th></tr>
  <tr><td>प्रथमा</td><td>बालकः, बालकौ, बालकाः</td><td>हरिः, हरी, हरयः</td><td>गुरुः, गुरू, गुरवः</td><td>पिता, पितरौ, पितरः</td></tr>
  <tr><td>द्वितीया</td><td>बालकम्, बालकौ, बालकान्</td><td>हरिम्, हरी, हरीन्</td><td>गुरुम्, गुरू, गुरून्</td><td>पितरम्, पितरौ, पितॄन्</td></tr>
  <tr><td>तृतीया</td><td>बालकेन, बालकाभ्याम्, बालकैः</td><td>हरिणा, हरिभ्याम्, हरिभिः</td><td>गुरुणा, गुरुभ्याम्, गुरुभिः</td><td>पित्रा, पितृभ्याम्, पितृभिः</td></tr>
  <tr><td>चतुर्थी</td><td>बालकाय, बालकाभ्याम्, बालकेभ्यः</td><td>हरये, हरिभ्याम्, हरिभ्यः</td><td>गुरवे, गुरुभ्याम्, गुरुभ्यः</td><td>पित्रे, पितृभ्याम्, पितृभ्यः</td></tr>
  <tr><td>पञ्चमी</td><td>बालकात्, बालकाभ्याम्, बालकेभ्यः</td><td>हरेः, हरिभ्याम्, हरिभ्यः</td><td>गुरोः, गुरुभ्याम्, गुरुभ्यः</td><td>पितुः, पितृभ्याम्, पितृभ्यः</td></tr>
  <tr><td>षष्ठी</td><td>बालकस्य, बालकयोः, बालकानाम्</td><td>हरेः, हर्योः, हरीणाम्</td><td>गुरोः, गुर्वोः, गुरूणाम्</td><td>पितुः, पित्रोः, पितॄणाम्</td></tr>
  <tr><td>सप्तमी</td><td>बालके, बालकयोः, बालकेषु</td><td>हरौ, हर्योः, हरिषु</td><td>गुरौ, गुर्वोः, गुरुषु</td><td>पितरि, पित्रोः, पितृषु</td></tr>
  <tr><td>सम्बोधनम्</td><td>हे बालक! हे बालकौ! हे बालकाः!</td><td>हे हरे! हे हरी! हे हरयः!</td><td>हे गुरो! हे गुरू! हे गुरवः!</td><td>हे पितः! हे पितरौ! हे पितरः!</td></tr>
</table>

<div class="section-title">२. स्त्रीलिङ्ग एवं नपुंसकलिङ्ग शब्दाः (Feminine & Neuter)</div>
<table>
  <tr><th>विभक्तिः</th><th>लता (आकारान्त स्त्री०)</th><th>नदी (ईकारान्त स्त्री०)</th><th>फल (अकारान्त नपुं०)</th><th>वारि (इकारान्त नपुं०)</th></tr>
  <tr><td>प्रथमा</td><td>लता, लते, लताः</td><td>नदी, नद्यौ, नद्यः</td><td>फलम्, फले, फलानि</td><td>वारि, वारिणी, वारीणि</td></tr>
  <tr><td>द्वितीया</td><td>लताम्, लते, लताः</td><td>नदीम्, नद्यौ, नदीः</td><td>फलम्, फले, फलानि</td><td>वारि, वारिणी, वारीणि</td></tr>
  <tr><td>तृतीया</td><td>लतया, लताभ्याम्, लताभिः</td><td>नद्या, नदीभ्याम्, नदीभिः</td><td>फलेन, फलाभ्याम्, फलैः</td><td>वारिणा, वारिभ्याम्, वारिभिः</td></tr>
  <tr><td>चतुर्थी</td><td>लतायै, लताभ्याम्, लताभ्यः</td><td>नद्यै, नदीभ्याम्, नदीभ्यः</td><td>फलाय, फलाभ्याम्, फलेभ्यः</td><td>वारिणे, वारिभ्याम्, वारिभ्यः</td></tr>
  <tr><td>पञ्चमी</td><td>लतायाः, लताभ्याम्, लताभ्यः</td><td>नद्याः, नदीभ्याम्, नदीभ्यः</td><td>फलात्, फलाभ्याम्, फलेभ्यः</td><td>वारिणः, वारिभ्याम्, वारिभ्यः</td></tr>
  <tr><td>षष्ठी</td><td>लतायाः, लतयोः, लतानाम्</td><td>नद्याः, नद्योः, नदीनाम्</td><td>फलस्य, फलयोः, फलानाम्</td><td>वारिणः, वारिणोः, वारीणाम्</td></tr>
  <tr><td>सप्तमी</td><td>लतायाम्, लतयोः, लतासु</td><td>नद्याम्, नद्योः, नदीषु</td><td>फले, फलयोः, फलेषु</td><td>वारिणि, वारिणोः, वारिषु</td></tr>
</table>

<div class="section-title">३. सर्वनाम-शब्दाः (Pronoun Paradigms)</div>
<table>
  <tr><th>विभक्तिः</th><th>अस्मद् (I / We)</th><th>युष्मद् (You)</th><th>तद् (He / That - पुं०)</th><th>तद् (She - स्त्री०)</th></tr>
  <tr><td>प्रथमा</td><td>अहम्, आवाम्, वयम्</td><td>त्वम्, युवाम्, यूयम्</td><td>सः, तौ, ते</td><td>सा, ते, ताः</td></tr>
  <tr><td>द्वितीया</td><td>माम्/मा, आवाम्/नौ, अस्मान्/नः</td><td>त्वाम्/त्वा, युवाम्/वाम्, युष्मान्/वः</td><td>तम्, तौ, तान्</td><td>ताम्, ते, ताः</td></tr>
  <tr><td>तृतीया</td><td>मया, आवाभ्याम्, अस्माभिः</td><td>त्वया, युवाभ्याम्, युष्माभिः</td><td>तेन, ताभ्याम्, तैः</td><td>तया, ताभ्याम्, ताभिः</td></tr>
  <tr><td>चतुर्थी</td><td>मह्यम्/मे, आवाभ्याम्/नौ, अस्मभ्यम्/नः</td><td>तुभ्यम्/ते, युवाभ्याम्/वाम्, युष्मभ्यम्/वः</td><td>तस्मै, ताभ्याम्, तेभ्यः</td><td>तस्यै, ताभ्याम्, ताभ्यः</td></tr>
  <tr><td>पञ्चमी</td><td>मत्, आवाभ्याम्, अस्मत्</td><td>त्वत्, युवाभ्याम्, युष्मत्</td><td>तस्मात्, ताभ्याम्, तेभ्यः</td><td>तस्याः, ताभ्याम्, ताभ्यः</td></tr>
  <tr><td>षष्ठी</td><td>मम/मे, आवयोः/नौ, अस्माकम्/नः</td><td>तव/ते, युवयोः/वाम्, युष्माकम्/वः</td><td>तस्य, तयोः, तेषाम्</td><td>तस्याः, तयोः, तासाम्</td></tr>
  <tr><td>सप्तमी</td><td>मयि, आवयोः, अस्मासु</td><td>त्वयि, युवयोः, युष्मासु</td><td>तस्मिन्, तयोः, तेषु</td><td>तस्याम्, तयोः, तासु</td></tr>
</table>

<div class="section-title">४. धातुरूपाणि — ५ लकाराः (Verb Conjugations across 5 Tenses)</div>
<table>
  <tr><th>लकारः (Tense)</th><th>प्रथमपुरुषः (३rd)</th><th>मध्यमपुरुषः (२nd)</th><th>उत्तमपुरुषः (१st)</th><th>अर्थः (English)</th></tr>
  <tr><td><strong>लट् (Present)</strong></td><td>पठति, पठतः, पठन्ति</td><td>पठसि, पठथः, पठथ</td><td>पठामि, पठावः, पठामः</td><td>Reads / Study</td></tr>
  <tr><td><strong>लृट् (Future)</strong></td><td>पठिष्यति, पठिष्यतः, पठिष्यन्ति</td><td>पठिष्यसि, पठिष्यथः, पठिष्यथ</td><td>पठिष्यमि, पठिष्यावः, पठिष्यामः</td><td>Will read</td></tr>
  <tr><td><strong>लङ् (Past)</strong></td><td>अपठत्, अपठताम्, अपठन्</td><td>अपठः, अपठतम्, अपठत</td><td>अपठम्, अपठाव, अपठाम</td><td>Read / Studied</td></tr>
  <tr><td><strong>लोट् (Imperative)</strong></td><td>पठतु, पठताम्, पठन्तु</td><td>पठ, पठतम्, पठत</td><td>पठानि, पठाव, पठाम</td><td>Order / Request</td></tr>
  <tr><td><strong>विधिलिङ् (Optative)</strong></td><td>पठेत्, पठेताम्, पठेयुः</td><td>पठेः, पठे तम्, पठे त</td><td>पठेयम्, पठेव, पठेम</td><td>Should read</td></tr>
</table>

<div class="footer">
  EdNet Learn Gurukul High-Yield Grammar Series · www.ednetlearn.in · Printable Reference Chart
</div>
</body>
</html>"""

# 3. Shiva Sutras & Mouth Map
html_shiva_sutras = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>Paninian Shiva Sutras & Vocal Articulation Anatomy Map</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">Phonetics, Acoustics &amp; Pāṇinian Grammar Architecture</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>अष्टाध्यायी-प्रवेशः</strong><br>माहेश्वर-सूत्राणि
  </div>
</div>

<div class="doc-title">Pāṇinian Shiva Sutras & Vocal Articulation Anatomy Map</div>
<div class="doc-sa">माहेश्वर-सूत्राणि वर्णोच्चारण-स्थानानि च</div>

<div class="box">
  <strong>माहेश्वर-सूत्राणां रहस्यम् (The 14 Foundation Sutras):</strong><br>
  नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम्। उद्धर्तुकामः सनकादिसिद्धानेताद्विमर्शे शिवसूत्रजालम्॥<br>
  Lord Shiva sounded his damaru 14 times (9 + 5) at the culmination of the cosmic dance, revealing the acoustic foundation of human speech.
</div>

<div class="section-title">१. चतुर्दश माहेश्वर-सूत्राणि (The 14 Acoustic Equations)</div>
<table>
  <tr><th>#</th><th>सूत्रम् (Sutra)</th><th>वर्ण-समूहः (Included Phonemes)</th><th>इत्-संज्ञकः (Marker)</th></tr>
  <tr><td>१</td><td><strong>अ इ उ ण्</strong></td><td>अ, इ, उ (मूल-स्वराः)</td><td>ण्</td></tr>
  <tr><td>२</td><td><strong>ऋ ऌ क्</strong></td><td>ऋ, ऌ (ह्रस्व-दीर्घ-स्वराः)</td><td>क्</td></tr>
  <tr><td>३</td><td><strong>ए ओ ङ्</strong></td><td>ए, ओ (गुण-स्वराः)</td><td>ङ्</td></tr>
  <tr><td>४</td><td><strong>ऐ औ च्</strong></td><td>ऐ, औ (वृद्धि-स्वराः)</td><td>च्</td></tr>
  <tr><td>५</td><td><strong>ह य व र ट्</strong></td><td>हकारः, अन्तःस्थाः (य, व, र)</td><td>ट्</td></tr>
  <tr><td>६</td><td><strong>ल ण्</strong></td><td>लकारः (अन्तःस्थः)</td><td>ण्</td></tr>
  <tr><td>७</td><td><strong>ञ म ङ ण न म्</strong></td><td>पञ्चम-वर्णाः (नासिक्याः / Nasals)</td><td>म्</td></tr>
  <tr><td>८</td><td><strong>झ भ ञ्</strong></td><td>चतुर्थ-वर्णाः (Voiced Aspirates)</td><td>ञ्</td></tr>
  <tr><td>९</td><td><strong>घ ढ ध ष्</strong></td><td>चतुर्थ-वर्णाः (Voiced Aspirates)</td><td>ष्</td></tr>
  <tr><td>१०</td><td><strong>ज ब ग ड द श्</strong></td><td>तृतीय-वर्णाः (Voiced Stops)</td><td>श्</td></tr>
  <tr><td>११</td><td><strong>ख फ छ ठ थ च ट त व्</strong></td><td>द्वितीय एवं प्रथम-वर्णाः (Voiceless Aspirates & Stops)</td><td>व्</td></tr>
  <tr><td>१२</td><td><strong>क प य्</strong></td><td>प्रथम-वर्णाः (क, प)</td><td>य्</td></tr>
  <tr><td>१३</td><td><strong>श ष स र्</strong></td><td>ऊष्म-वर्णाः (Sibilants / Fricatives)</td><td>र्</td></tr>
  <tr><td>१४</td><td><strong>ह ल्</strong></td><td>हकारः (Glottal Fricative)</td><td>ल्</td></tr>
</table>

<div class="section-title">२. वर्णोच्चारण-स्थानानि (Vocal Articulation Anatomy Map)</div>
<table>
  <tr><th>स्थानम् (Anatomical Site)</th><th>संस्कृत-सूत्रम् (Pāṇini Rule)</th><th>वर्णाः (Phonemes)</th><th>ध्वनि-प्रकारः (Phonetic Classification)</th></tr>
  <tr><td><strong>कण्ठः (Throat)</strong></td><td>अकुहविसर्जनीयानां कण्ठः</td><td>अ, आ, क, ख, ग, घ, ङ, ह, विसर्ग (:)</td><td>कण्ठ्य (Velar / Glottal)</td></tr>
  <tr><td><strong>तालु (Hard Palate)</strong></td><td>इचुयशानां तालु</td><td>इ, ई, च, छ, ज, झ, ञ, य, श</td><td>तालव्य (Palatal)</td></tr>
  <tr><td><strong>मूर्धा (Roof of Mouth)</strong></td><td>ऋटुरषाणां मूर्धा</td><td>ऋ, ॠ, ट, ठ, ड, ढ, ण, र, ष</td><td>मूर्धन्य (Retroflex / Cerebral)</td></tr>
  <tr><td><strong>दन्ताः (Teeth)</strong></td><td>ऌतुलसानां दन्ताः</td><td>ऌ, त, थ, द, ध, न, ल, स</td><td>दन्त्य (Dental)</td></tr>
  <tr><td><strong>ओष्ठौ (Lips)</strong></td><td>उपूपध्मानीयानाम् ओष्ठौ</td><td>उ, ऊ, प, फ, ब, भ, म, उपध्मानीय</td><td>ओष्ठ्य (Bilabial)</td></tr>
  <tr><td><strong>नासिका (Nose)</strong></td><td>ञमङणनानां नासिका च</td><td>ञ, म, ङ, ण, न, अनुस्वार (ं)</td><td>नासिक्य (Nasal Resonance)</td></tr>
  <tr><td><strong>कण्ठ-तालु</strong></td><td>एदैतोः कण्ठतालु</td><td>ए, ऐ</td><td>कण्ठतालव्य (Palato-Velar)</td></tr>
  <tr><td><strong>कण्ठ-ओष्ठम्</strong></td><td>ओदौतोः कण्ठोष्ठम्</td><td>ओ, औ</td><td>कण्ठौष्ठ्य (Labio-Velar)</td></tr>
  <tr><td><strong>दन्त-ओष्ठम्</strong></td><td>वकारस्य दन्तोष्ठम्</td><td>व</td><td>दन्तोष्ठ्य (Labio-Dental)</td></tr>
</table>

<div class="section-title">३. प्रत्याहार-संरचना (The Pratyāhāra Decoding Matrix)</div>
<div class="box">
  <strong>प्रत्याहार-नियमः (आदिरन्त्येन सहेता — १.१.७१):</strong><br>
  An initial sound combined with a final marker encompasses all intermediate sounds.<br>
  • <strong>अच्</strong> = अ तः च् पर्यन्तम् = अ इ उ ऋ ऌ ए ओ ऐ औ (सर्व-स्वराः / All Vowels)<br>
  • <strong>हल्</strong> = ह तः ल् पर्यन्तम् = सर्वे व्यञ्जन-वर्णाः (All 33 Consonants)<br>
  • <strong>अल्</strong> = अ तः ल् पर्यन्तम् = सम्पूर्णा वर्णमाला (All Vowels + Consonants = 42 Letters)<br>
  • <strong>यण्</strong> = य व र ल (अन्तःस्थाः / Semi-vowels; used in यण्-सन्धिः: इ/उ/ऋ/ऌ ➔ य/व/र/ल)<br>
  • <strong>झल्</strong> = सर्वे वर्गीय-वर्णाः + ऊष्माणः (All stops + sibilants)
</div>

<div class="footer">
  EdNet Learn Gurukul Acoustics &amp; Phonetics Guide · www.ednetlearn.in · Printable Study Sheet
</div>
</body>
</html>"""

generate_pdf(html_qb, "CBSE_Class7_Sanskrit_Deepakam_Master_Question_Bank.pdf")
generate_pdf(html_cheat_sheet, "Sanskrit_Shabdroop_Dhaturoop_Master_Cheat_Sheet.pdf")
generate_pdf(html_shiva_sutras, "Paninian_Shiva_Sutras_Phonetic_Mouth_Map.pdf")
print("All 3 study vault PDFs generated successfully!")

html_mock_kit = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>CBSE Sanskrit Class 7 & 8 Pre-Term Blueprint Mock Exam Kit</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">CBSE Simulated Exam Series · 80 Marks Blueprint Paper</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>Time: 3 Hours</strong><br>Max Marks: 80
  </div>
</div>

<div class="doc-title">CBSE Sanskrit Simulated Mock Examination & Marking Scheme</div>
<div class="doc-sa">सीबीएसई-प्रतिदर्श-प्रश्नपत्रम् सविस्तर-मूल्याङ्कन-योजना च</div>

<div class="section-title">खण्डः 'क' — अपठित-अवबोधनम् (Section A: Reading Comprehension - 10 Marks)</div>
<div class="box">
  <strong>गद्यांशः:</strong> संस्कृतभाषा विश्वस्य सर्वासु भाषासु प्राचीनतमा अस्ति। इयं देवभाषा, सुरभारती, गीर्वाणवाणी चेति कथ्यते। भारतस्य गौरवम्, अस्माकं संस्कृतिः च संस्कृतभाषायामेव सुरक्षिता। अस्याः व्याकरणं सुव्यवस्थितं वैज्ञानिकं च वर्तते। पाणिनि-मुनिना विरचिता अष्टाध्यायी अस्य प्रमाणम् अस्ति।
</div>
<div class="q-block">
  <div class="q-title">१. एकपदेन उत्तरत:</div>
  <p>(क) विश्वस्य प्राचीनतमा भाषा का? ➔ <span style="color:#166534; font-weight:700;">संस्कृतभाषा</span><br>
  (ख) अष्टाध्यायी केन विरचिता? ➔ <span style="color:#166534; font-weight:700;">पाणिनिना</span></p>
</div>

<div class="section-title">खण्डः 'ख' — रचनात्मक-कार्यम् (Section B: Writing Skills - 15 Marks)</div>
<div class="q-block">
  <div class="q-title">१. चित्रवर्णनम् (Picture Composition):</div>
  <p>मञ्जूषातः पदानि चित्वा चित्रं दृष्ट्वा पञ्च वाक्यानि रचयत:<br>
  <strong>मञ्जूषा:</strong> [ उद्यानम्, वृक्षाः, बालकाः, कन्दुकेन, क्रीडन्ति, विकसन्ति, पुष्पाणि ]<br>
  <div class="q-ans">
    १. इदम् एकस्य रम्यस्य उद्यानस्य चित्रम् अस्ति।<br>
    २. उद्याने विविधाः हरिताः वृक्षाः सन्ति।<br>
    ३. बालकाः हर्षेण कन्दुकेन सह क्रीडन्ति।<br>
    ४. तत्र मनोहराणि पुष्पाणि विकसन्ति।<br>
    ५. जनाः प्रातर्भ्रमणाय अत्र आगच्छन्ति।
  </div></p>
</div>

<div class="section-title">खण्डः 'ग' — अनुप्रयुक्त-व्याकरणम् (Section C: Applied Grammar - 25 Marks)</div>
<div class="q-block">
  <div class="q-title">१. सन्धिकार्यम्:</div>
  <p>• <strong>विद्या + आलयः</strong> = विद्यालयः (दीर्घसन्धिः)<br>
  • <strong>सूर्य + उदयः</strong> = सूर्योदयः (गुणसन्धिः)<br>
  • <strong>यदि + अपि</strong> = यद्यपि (यण्सन्धिः)<br>
  • <strong>पौ + अकः</strong> = पावकः (अयादिसन्धिः)</p>
</div>

<div class="section-title">खण्डः 'घ' — पठित-अवबोधनम् (Section D: Textbook Comprehension - 30 Marks)</div>
<div class="q-block">
  <div class="q-title">१. श्लोकान्वयः भावार्थश्च (Deepakam Ch. 1 & 2):</div>
  <p><em>पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते॥</em><br>
  <strong>अन्वयः:</strong> पृथिव्यां जलम् अन्नं सुभाषितं (इति) त्रीणि रत्नानि (सन्ति)। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते।</p>
</div>

<div class="footer">
  EdNet Learn Gurukul CBSE Blueprint Examination Series · www.ednetlearn.in · Model Marking Scheme Included
</div>
</body>
</html>
"""
generate_pdf(html_mock_kit, "CBSE_Sanskrit_Blueprint_Mock_Exam_Kit.pdf")
print("Mock kit generated!")
