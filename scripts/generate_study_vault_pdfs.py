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
  font-size: 10.5pt;
}
.header {
  border-bottom: 2px solid #b45309;
  padding-bottom: 10px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand-title {
  font-size: 17pt;
  font-weight: 800;
  color: #78350f;
  margin: 0;
}
.brand-sub {
  font-size: 9.5pt;
  color: #92400e;
  font-weight: 600;
}
.doc-title {
  font-size: 15pt;
  font-weight: 800;
  color: #0f766e;
  margin: 12px 0 4px 0;
}
.doc-sa {
  font-size: 12.5pt;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 12px;
}
.section-title {
  font-size: 12pt;
  font-weight: 700;
  color: #1e3a8a;
  border-bottom: 1.5px solid #cbd5e1;
  padding-bottom: 3px;
  margin-top: 18px;
  margin-bottom: 8px;
}
.box {
  background: #fdfbf7;
  border: 1px solid #e2d9cc;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 14px;
  font-size: 9.5pt;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0 14px 0;
  font-size: 9pt;
}
th, td {
  border: 1px solid #cbd5e1;
  padding: 5px 8px;
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
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 8pt;
  font-weight: 700;
  background: #fef3c7;
  color: #92400e;
  margin-right: 5px;
}
.q-block {
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #e2e8f0;
}
.q-title {
  font-weight: 700;
  color: #0f172a;
  font-size: 10pt;
}
.q-ans {
  color: #166534;
  background: #f0fdf4;
  border-left: 3px solid #22c55e;
  padding: 3px 8px;
  margin-top: 3px;
  font-size: 9.5pt;
}
.footer {
  margin-top: 24px;
  border-top: 1px solid #e2e8f0;
  padding-top: 8px;
  font-size: 8pt;
  color: #64748b;
  text-align: center;
}
.toc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 16px;
  font-size: 9pt;
  margin-bottom: 14px;
}
.toc-item {
  border-bottom: 1px dotted #cbd5e1;
  padding-bottom: 2px;
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

# 1. Complete 15-Chapter Master Question Bank for NCERT Class 7 Deepakam
html_qb_all15 = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>NCERT Class 7 Sanskrit Deepakam: Complete 15-Chapter Master Question Bank & Solutions</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">NCERT · CBSE Class 7 Academic Study Vault (दीपकम-पाठ्यपुस्तकम्)</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>Class 7 Sanskrit (कक्षा ७)</strong><br>Complete 15-Chapter Solved Bank
  </div>
</div>

<div class="doc-title">NCERT Deepakam Class 7 Sanskrit: 15-Chapter Master Question Bank & Solutions</div>
<div class="doc-sa">सप्तम-कक्षायाः दीपकम-पाठ्यपुस्तकस्य सम्पूर्ण-पञ्चदश-पाठानां प्रश्नकोशः सविस्तर-समाधानम् च</div>

<div class="box">
  <strong>विषय-सूची (Complete 15-Chapter Master Index):</strong>
  <div class="toc-grid" style="margin-top: 6px;">
    <div class="toc-item">१. वन्दे भारतमातरम् (Salutations to Mother India)</div>
    <div class="toc-item">९. अन्नाद् भवन्ति भूतानि (Cosmic Nourishment)</div>
    <div class="toc-item">२. नित्यं पिबामः सुभाषितरसम् (Subhashitas)</div>
    <div class="toc-item">१०. दशमः कः? (Who is the Tenth?)</div>
    <div class="toc-item">३. मित्राय नमः (Surya Namaskar & Companionship)</div>
    <div class="toc-item">११. द्वीपेषु रम्यः द्वीपोऽण्डमानः (Andaman Islands)</div>
    <div class="toc-item">४. न लभ्यते चेत् आम्लं द्राक्षाफलम् (Sour Grapes)</div>
    <div class="toc-item">१२. वीराङ्गना पन्नाधाया (The Valorous Panna Dhai)</div>
    <div class="toc-item">५. सेवा हि परमो धर्मः (Service is Highest Virtue)</div>
    <div class="toc-item">१३. अतिरिक्तम्: वर्णमात्रा-परिचयः (Acoustics & Mora)</div>
    <div class="toc-item">६. क्रीडाम वयं श्लोकान्त्याक्षरीम् (Antakshari)</div>
    <div class="toc-item">१४. परिशिष्टम् १: शब्दरूपाणि (Declensions)</div>
    <div class="toc-item">७. ईशावास्यम् इदं सर्वम् (Isha Upanishad)</div>
    <div class="toc-item">१५. परिशिष्टम् २: धातुरूपाणि (Verb Conjugations)</div>
    <div class="toc-item">८. हितं मनोहारि च दुर्लभं वचः (Kiratarjuniyam)</div>
    <div class="toc-item">★ CBSE Class 7 Exam Master Revision Matrix</div>
  </div>
</div>

<!-- CHAPTER 1 -->
<div class="section-title">प्रथमः पाठः — वन्दे भारतमातरम् (Chapter 1: Salutations to Mother India)</div>
<div class="q-block">
  <div class="q-title">१. श्लोकः, अन्वयः शब्दार्थाश्च:</div>
  <p><em>वन्दे भारतमातरम्। धवलाम्बुजवासिनीं ज्ञानप्रदां सुभाषिणीम्॥</em><br>
  <strong>अन्वयः:</strong> धवलाम्बुजवासिनीं ज्ञानप्रदां सुभाषिणीं भारतमातरम् (अहं) वन्दे।<br>
  <strong>शब्दार्थाः:</strong> धवलाम्बुजवासिनीम् = श्वेतकमले स्थिताम् (seated on white lotus) | ज्ञानप्रदाम् = विद्यादात्रीम् | सुभाषिणीम् = मधुरभाषिणीम्।</p>
  <div class="q-ans"><strong>भावार्थः:</strong> मैं श्वेत कमल पर विराजित, ज्ञान प्रदान करने वाली तथा मधुर बोलने वाली भारतमाता की वन्दना करता हूँ।</div>
</div>
<div class="q-block">
  <div class="q-title">२. एकपदेन उत्तरत:</div>
  <p>(क) वयम् कां वन्दामहे? ➔ <span style="color:#166534; font-weight:700;">भारतमातरम्</span><br>
  (ख) भारतमाता कीदृशी अस्ति? ➔ <span style="color:#166534; font-weight:700;">धवलाम्बुजवासिनी / ज्ञानप्रदा</span><br>
  (ग) 'अम्बुजम्' पदस्य पर्यायपदं किम्? ➔ <span style="color:#166534; font-weight:700;">कमलम् / पद्मम्</span></p>
</div>

<!-- CHAPTER 2 -->
<div class="section-title">द्वितीयः पाठः — नित्यं पिबामः सुभाषितरसम् (Chapter 2: Drink the Nectar of Subhashitas)</div>
<div class="q-block">
  <div class="q-title">१. श्लोक-व्याख्या अन्वयश्च:</div>
  <p><em>पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते॥</em><br>
  <strong>अन्वयः:</strong> पृथिव्यां जलम् अन्नं सुभाषितं (इति) त्रीणि रत्नानि (सन्ति)। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते।</p>
  <div class="q-ans"><strong>समाधानम्:</strong> पृथिव्यां वास्तविकानि रत्नानि जल, अन्न एवं सुभाषित हैं, परन्तु मूर्ख लोग पत्थरों (हीरा-मोती आदि) को रत्न मानते हैं।</div>
</div>
<div class="q-block">
  <div class="q-title">२. सन्धि-विच्छेदं कुरुत:</div>
  <p>• जलमन्नम् = <strong>जलम् + अन्नम्</strong> (व्यञ्जनसन्धिः)<br>
  • रत्नसंज्ञा = <strong>रत्न + संज्ञा</strong><br>
  • सत्येनैव = <strong>सत्येन + एव</strong> (वृद्धिसन्धिः)</p>
</div>

<!-- CHAPTER 3 -->
<div class="section-title">तृतीयः पाठः — मित्राय नमः (Chapter 3: Salutations to Friend / Surya Namaskar)</div>
<div class="q-block">
  <div class="q-title">१. सूर्यनमस्कार-मन्त्राः संवादश्च:</div>
  <p>• सूर्यनमस्कारे कति आसनानि मन्त्राश्च भवन्ति? ➔ <strong>द्वादश (12)</strong><br>
  • <em>'ॐ मित्राय नमः'</em> — सूर्यः सर्वस्य जगतः प्रथमः मित्रः अस्ति।</p>
  <div class="q-ans"><strong>सच्चा मित्रः कः?</strong> आपत्काले, दुर्भिक्षे, व्यसने, राजद्वारे श्मशाने च यः तिष्ठति सः एव सच्चा मित्रः बान्धवः च भवति।</div>
</div>

<!-- CHAPTER 4 -->
<div class="section-title">चतुर्थः पाठः — न लभ्यते चेत् आम्लं द्राक्षाफलम् (Chapter 4: The Grapes are Sour)</div>
<div class="q-block">
  <div class="q-title">१. कथा-सारः व्याकरणं च:</div>
  <p>• एकः पिपासितः बुभुक्षितः शृगालः वने भ्रमति। सः द्राक्षावाटिकां गच्छति।<br>
  • द्राक्षाफलं लब्धुं सः बहुवारम् उत्पतति, किन्तु न प्राप्नोति। अन्ते सः वदति—<em>'आम्लं द्राक्षाफलम्'</em>।<br>
  • <strong>'पिपासितः'</strong> एवं <strong>'बुभुक्षितः'</strong> पदे प्रत्ययः कः? ➔ <strong>क्त-प्रत्ययः</strong> (पिपासा + क्त / क्षुध् + क्त)।</p>
</div>

<!-- CHAPTER 5 -->
<div class="section-title">पञ्चमः पाठः — सेवा हि परमो धर्मः (Chapter 5: Service is the Highest Virtue)</div>
<div class="q-block">
  <div class="q-title">१. श्लोकः अन्वयश्च:</div>
  <p><em>परोपकाराय फलन्ति वृक्षाः परोपकाराय वहन्ति नद्यः। परोपकाराय दुहन्ति गावः परोपकारार्थमिदं शरीरम्॥</em><br>
  <strong>अन्वयः:</strong> वृक्षाः परोपकाराय फलन्ति, नद्यः परोपकाराय वहन्ति, गावः परोपकाराय दुहन्ति, इदं शरीरं परोपकारार्थम् (एव अस्ति)।</p>
  <div class="q-ans"><strong>उत्तरम्:</strong> जीवनस्य वास्तविकं सार्थकत्वं परोपकारे समाजसेवायाम् एव वर्तते। विद्या, धनं पदवी च यदि दीनानां कल्याणाय न प्रयुक्ताः तर्हि व्यर्थाः।</div>
</div>
<div class="q-block">
  <div class="q-title">२. एकपदेन उत्तरत:</div>
  <p>(क) वृक्षाः किमर्थं फलन्ति? ➔ <span style="color:#166534; font-weight:700;">परोपकाराय</span><br>
  (ख) मानवशरीरं कस्य अर्थे वर्तते? ➔ <span style="color:#166534; font-weight:700;">परोपकारार्थम्</span><br>
  (ग) परमो धर्मः कः कथ्यते? ➔ <span style="color:#166534; font-weight:700;">सेवा (सेवाभावः)</span></p>
</div>

<!-- CHAPTER 6 -->
<div class="section-title">षष्ठः पाठः — क्रीडाम वयं श्लोकान्त्याक्षरीम् (Chapter 6: Let Us Play Shloka Antakshari)</div>
<div class="q-block">
  <div class="q-title">१. अन्त्याक्षरी-नियमाः सुभाषितानि च:</div>
  <p>• <strong>नियमः:</strong> श्लोकस्य अन्तिमवर्णेन नूतनः श्लोकः आरभ्यते। यथा—<br>
  १. <em>विद्या ददाति विनयं विनयाद् याति पात्रताम्। पात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुख<strong>म्</strong>॥</em> (अन्तिमवर्णः: म्)<br>
  २. <em><strong>म</strong>नस्येकं वचस्येकं कर्मण्येकं महात्मनाम्। मनस्यन्यद् वचस्यन्यत् कर्मण्यन्यद् दुरात्मनाम्॥</em></p>
  <div class="q-ans"><strong>लाभः:</strong> श्लोकान्त्याक्षर्या स्मरणशक्तिः, शुद्धोच्चारणम्, संस्कृत-शब्दभण्डारः च वर्धन्ते।</div>
</div>

<!-- CHAPTER 7 -->
<div class="section-title">सप्तमः पाठः — ईशावास्यम् इदं सर्वम् (Chapter 7: All this is Enveloped by God)</div>
<div class="q-block">
  <div class="q-title">१. उपनिषद्-मन्त्रः अन्वयः च (Isha Upanishad 1):</div>
  <p><em>ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्। तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद् धनम्॥</em><br>
  <strong>अन्वयः:</strong> जगत्यां यत् किञ्च जगत् इदं सर्वम् ईशा वास्यम्। तेन त्यक्तेन भुञ्जीथाः, कस्यस्विद् धनं मा गृधः।</p>
  <div class="q-ans"><strong>प्रश्नः:</strong> मनुष्यः कथं भुञ्जीत? ➔ <strong>त्यक्तेन भावेन</strong> (With an attitude of detachment).<br>
  <strong>प्रश्नः:</strong> कस्य धने गृधः न कर्तव्यः? ➔ <strong>कस्यापि धने</strong> (Do not covet anyone's wealth).</div>
</div>

<!-- CHAPTER 8 -->
<div class="section-title">अष्टमः पाठः — हितं मनोहारि च दुर्लभं वचः (Chapter 8: Kiratarjuniyam Wisdom)</div>
<div class="q-block">
  <div class="q-title">१. भारवेः नीतिश्लोकः (Kiratarjuniyam 1.4):</div>
  <p><em>क्रियासु युक्तैर्नृप चारचक्षुषो न वञ्चनीयाः प्रभवोऽनुजीविभिः।<br>
  अतोऽर्हसि क्षन्तुमसाधु साधु वा हितं मनोहारि च दुर्लभं वचः॥</em></p>
  <div class="q-ans">
    (क) कीदृशं वचः दुर्लभं भवति? ➔ <strong>हितं मनोहारि च</strong> (Beneficial yet pleasing words).<br>
    (ख) राजानः कैः पश्यन्ति? ➔ <strong>चारचक्षुषा (गूढचरैः / Spies)</strong>।<br>
    (ग) 'प्रभवः' पदस्य कः अर्थः? ➔ <strong>स्वामिनः / राजानः (Masters / Kings)</strong>।
  </div>
</div>

<!-- CHAPTER 9 -->
<div class="section-title">नवमः पाठः — अन्नाद् भवन्ति भूतानि (Chapter 9: The Cosmic Nourishment Cycle)</div>
<div class="q-block">
  <div class="q-title">१. गीता-श्लोकः सृष्टिचक्रं च (Bhagavad Gita 3.14):</div>
  <p><em>अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः। यज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥</em><br>
  <strong>अन्वयः:</strong> अन्नात् भूतानि भवन्ति, पर्जन्यात् अन्नसम्भवः, यज्ञात् पर्जन्यः भवति, यज्ञः कर्मसमुद्भवः।</p>
  <div class="q-ans">
    • भूतानि कस्मात् भवन्ति? ➔ <strong>अन्नात्</strong> (From food).<br>
    • अन्नं कस्मात् सम्भवति? ➔ <strong>पर्जन्यात् / वृष्टेः</strong> (From rain).<br>
    • पर्जन्यः कस्मात् भवति? ➔ <strong>यज्ञात्</strong> (From selfless cooperative action / sacrifice).
  </div>
</div>

<!-- CHAPTER 10 -->
<div class="section-title">दशमः पाठः — दशमः कः? (Chapter 10: Who is the Tenth?)</div>
<div class="q-block">
  <div class="q-title">१. हास्यकथा आत्मज्ञानं च:</div>
  <p>दश बालकाः स्नानाय नदीम् अगच्छन्। तीर्त्वा नायकः अगायत्—'एकः, द्वौ, त्रयः... नव'। सः आत्मानं न अगणयत्। सर्वे दुःखिताः अभवन्। तदा कश्चित् पथिकः आगत्य अवदत्—<em>'दशमस्त्वमसि'</em> (You yourself are the tenth!)।</p>
  <div class="q-ans"><strong>गूढार्थः:</strong> अज्ञानेन मनुष्यः बहिर्मुखः सन् बाह्यजगति अन्वेषणं करोति, किन्तु स्वस्य आत्मतत्त्वं विस्मरति।</div>
</div>

<!-- CHAPTER 11 -->
<div class="section-title">एकादशः पाठः — द्वीपेषु रम्यः द्वीपोऽण्डमानः (Chapter 11: The Andaman Islands)</div>
<div class="q-block">
  <div class="q-title">१. भूगोलः इतिहासः च:</div>
  <p>(क) अण्डमान-निकोबार-द्वीपसमूहस्य राजधानी का? ➔ <strong>पोर्टब्लेयर (Port Blair)</strong><br>
  (ख) तत्र प्रसिद्धं राष्ट्रियं स्मारकं किम्? ➔ <strong>सेल्यूलर-कारागारम् (Cellular Jail)</strong><br>
  (ग) अण्डमान-द्वीपः कस्य सागरस्य मध्ये स्थितः? ➔ <strong>वङ्गोपसागरस्य (Bay of Bengal)</strong><br>
  (घ) 'स्वाधीनता-सङ्ग्रामे' कस्य वीरस्य त्यागः स्मर्यते? ➔ <strong>वीर-सावरकरस्य</strong></p>
</div>

<!-- CHAPTER 12 -->
<div class="section-title">द्वादशः पाठः — वीराङ्गना पन्नाधाया (Chapter 12: The Valorous Panna Dhai)</div>
<div class="q-block">
  <div class="q-title">१. त्यागः शौर्यं च (Mewar History):</div>
  <p>मेवाड़-राज्ये स्वामिभक्ता धात्री पन्ना स्वस्य सुतं चन्दनं बलिं कृत्वा राजकुमारस्य उदयसिंहस्य प्राणान् अत्रासत। क्रूरात् बनवीरात् मेवाड़-वंशं रक्षितवती।</p>
  <div class="q-ans">
    (क) पन्नाधाया कस्य पुत्रस्य रक्षणम् अकरोत्? ➔ <strong>उदयसिंहस्य</strong><br>
    (ख) पन्नायाः स्वपुत्रस्य नाम किम् आसीत्? ➔ <strong>चन्दनः</strong><br>
    (ग) पन्नाधायायाः जीवनं केन गुणेन शोभते? ➔ <strong>अतुल्य-स्वामिभक्त्या आत्मोत्सर्गेण च</strong>
  </div>
</div>

<!-- CHAPTER 13 -->
<div class="section-title">त्रयोदशः पाठः — अतिरिक्तम्: वर्णमात्रा-परिचयः (Chapter 13: Acoustics & Mora Measures)</div>
<div class="q-block">
  <div class="q-title">१. मात्रा-व्यवस्था (Phonetic Quantity):</div>
  <table>
    <tr><th>स्वर-प्रकारः</th><th>मात्रा-सङ्ख्या</th><th>ध्वनि-उदाहरणम्</th><th>परिभाषा</th></tr>
    <tr><td><strong>ह्रस्व-स्वरः</strong></td><td>१ मात्रा (एकमात्रा)</td><td>अ, इ, उ, ऋ, ऌ</td><td>एक-निमेष-कालेन उच्चार्यते (Short vowel)</td></tr>
    <tr><td><strong>दीर्घ-स्वरः</strong></td><td>२ मात्राः (द्विमात्रा)</td><td>आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ</td><td>द्विगुण-कालेन उच्चार्यते (Long vowel)</td></tr>
    <tr><td><strong>प्लुत-स्वरः</strong></td><td>३ मात्राः (त्रिमात्रा)</td><td>ओ३म्, हे राम३</td><td>त्रिगुण-कालेन उच्चार्यते (Prolonged vowel)</td></tr>
    <tr><td><strong>व्यञ्जनम् (हल्)</strong></td><td>१/२ मात्रा (अर्धमात्रा)</td><td>क्, त्, म्, य्...</td><td>स्वरं विना अर्धमात्रिकं भवति</td></tr>
  </table>
</div>

<!-- CHAPTER 14 -->
<div class="section-title">चतुर्दशः पाठः — परिशिष्टम् १: शब्दरूपाणि (Chapter 14: CBSE Class 7 Declensions)</div>
<div class="q-block">
  <div class="q-title">१. पञ्च-प्रमुख-शब्दरूपाणां परीक्षा-सारणी:</div>
  <table>
    <tr><th>शब्दः (Stem)</th><th>विभक्तिः</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th></tr>
    <tr><td><strong>बालक</strong> (पुं०)</td><td>तृतीया</td><td>बालकेन</td><td>बालकाभ्याम्</td><td>बालकैः</td></tr>
    <tr><td><strong>लता</strong> (स्त्री०)</td><td>पञ्चमी</td><td>लतायाः</td><td>लताभ्याम्</td><td>लताभ्यः</td></tr>
    <tr><td><strong>फल</strong> (नपुं०)</td><td>प्रथमा / द्वितीया</td><td>फलम्</td><td>फले</td><td>फलानि</td></tr>
    <tr><td><strong>मुनि</strong> (इकारान्त पुं०)</td><td>षष्ठी</td><td>मुनेः</td><td>मुन्योः</td><td>मुनीनाम्</td></tr>
    <tr><td><strong>अस्मद्</strong> (सर्वनाम)</td><td>प्रथमा</td><td>अहम्</td><td>आवाम्</td><td>वयम्</td></tr>
    <tr><td><strong>युष्मद्</strong> (सर्वनाम)</td><td>द्वितीया</td><td>त्वाम् / त्वा</td><td>युवाम् / वाम्</td><td>युष्मान् / वः</td></tr>
  </table>
</div>

<!-- CHAPTER 15 -->
<div class="section-title">पञ्चदशः पाठः — परिशिष्टम् २: धातुरूपाणि (Chapter 15: 5 CBSE Verb Lakāras)</div>
<div class="q-block">
  <div class="q-title">१. 'पठ्' धातोः पञ्चसु लकारेषु प्रथमपुरुष-रूपाणि:</div>
  <table>
    <tr><th>लकारः (Tense / Mood)</th><th>अर्थः (English)</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th></tr>
    <tr><td><strong>लट्-लकारः</strong></td><td>Present Tense</td><td>पठति</td><td>पठतः</td><td>पठन्ति</td></tr>
    <tr><td><strong>लृट्-लकारः</strong></td><td>Future Tense</td><td>पठिष्यति</td><td>पठिष्यतः</td><td>पठिष्यन्ति</td></tr>
    <tr><td><strong>लङ्-लकारः</strong></td><td>Past Tense</td><td>अपठत्</td><td>अपठताम्</td><td>अपठन्</td></tr>
    <tr><td><strong>लोट्-लकारः</strong></td><td>Imperative / Order</td><td>पठतु</td><td>पठताम्</td><td>पठन्तु</td></tr>
    <tr><td><strong>विधिलिङ्-लकारः</strong></td><td>Potential / Should</td><td>पठेत्</td><td>पठेताम्</td><td>पठेयुः</td></tr>
  </table>
  <div class="q-ans">
    • गम्/गच्छ् (लट्): गच्छति, गच्छतः, गच्छन्ति | (लृट्): गमिष्यति | (लङ्): अगच्छत्<br>
    • भू/भव् (लट्): भवति, भवतः, भवन्ति | (लृट्): भविष्यति | (लङ्): अभवत्
  </div>
</div>

<div class="footer">
  EdNet Learn Gurukul Academic Study Vault · NCERT Class 7 Sanskrit Deepakam (All 15 Chapters Solved) · www.ednetlearn.in
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

<div class="doc-title">Top 100 Shabdroop &amp; Dhaturoop Master Revision Matrix</div>
<div class="doc-sa">शत-प्रमुखाणां शब्दरूपाणां धातुरूपाणां च सूत्र-सारणी</div>

<div class="section-title">१. अकारान्त-पुंलिङ्ग-शब्दः — 'बालक' (Boy)</div>
<table>
  <tr><th>विभक्तिः</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th><th>कारकम् (Syntactic Role)</th></tr>
  <tr><td><strong>प्रथमा</strong> (Nom.)</td><td>बालकः</td><td>बालकौ</td><td>बालकाः</td><td>कर्ता (Subject: -ने)</td></tr>
  <tr><td><strong>द्वितीया</strong> (Acc.)</td><td>बालकम्</td><td>बालकौ</td><td>बालकान्</td><td>कर्म (Object: -को)</td></tr>
  <tr><td><strong>तृतीया</strong> (Inst.)</td><td>बालकेन</td><td>बालकाभ्याम्</td><td>बालकैः</td><td>करण (Instrument: -से/-द्वारा)</td></tr>
  <tr><td><strong>चतुर्थी</strong> (Dat.)</td><td>बालकाय</td><td>बालकाभ्याम्</td><td>बालकेभ्यः</td><td>सम्प्रदान (Recipient: -के लिए)</td></tr>
  <tr><td><strong>पञ्चमी</strong> (Abl.)</td><td>बालकात्</td><td>बालकाभ्याम्</td><td>बालकेभ्यः</td><td>अपादान (Separation: -से पृथक्)</td></tr>
  <tr><td><strong>षष्ठी</strong> (Gen.)</td><td>बालकस्य</td><td>बालकयोः</td><td>बालकानाम्</td><td>सम्बन्ध (Possession: -का/-के/-की)</td></tr>
  <tr><td><strong>सप्तमी</strong> (Loc.)</td><td>बालके</td><td>बालकयोः</td><td>बालकेषु</td><td>अधिकरण (Location: -में/-पर)</td></tr>
  <tr><td><strong>सम्बोधनम्</strong> (Voc.)</td><td>हे बालक!</td><td>हे बालकौ!</td><td>हे बालकाः!</td><td>सम्बोधनम् (Address)</td></tr>
</table>

<div class="section-title">२. आकारान्त-स्त्रीलिङ्ग-शब्दः — 'लता' (Creeper)</div>
<table>
  <tr><th>विभक्तिः</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th></tr>
  <tr><td><strong>प्रथमा / सम्बोधनम्</strong></td><td>लता / हे लते!</td><td>लते / हे लते!</td><td>लताः / हे लताः!</td></tr>
  <tr><td><strong>द्वितीया</strong></td><td>लताम्</td><td>लते</td><td>लताः</td></tr>
  <tr><td><strong>तृतीया</strong></td><td>लतया</td><td>लताभ्याम्</td><td>लताभिः</td></tr>
  <tr><td><strong>चतुर्थी</strong></td><td>लतायै</td><td>लताभ्याम्</td><td>लताभ्यः</td></tr>
  <tr><td><strong>पञ्चमी / षष्ठी</strong></td><td>लतायाः</td><td>लतयोः</td><td>लताभ्यः / लतानाम्</td></tr>
  <tr><td><strong>सप्तमी</strong></td><td>लतायाम्</td><td>लतयोः</td><td>लतासु</td></tr>
</table>

<div class="section-title">३. अकारान्त-नपुंसकलिङ्ग-शब्दः — 'फल' (Fruit)</div>
<table>
  <tr><th>विभक्तिः</th><th>एकवचनम्</th><th>द्विवचनम्</th><th>बहुवचनम्</th></tr>
  <tr><td><strong>प्रथमा / द्वितीया</strong></td><td>फलम्</td><td>फले</td><td>फलानि</td></tr>
  <tr><td><em>तृतीया तः सप्तमी पर्यन्तम्</em></td><td colspan="3">बालकवत् रूपाणि भवन्ति (यथा—फलेन, फलाय, फलात्, फलस्य, फले)</td></tr>
</table>

<div class="section-title">४. अस्मद् (अहम्/I) एवं युष्मद् (त्वम्/You) सर्वनाम-सारणी</div>
<table>
  <tr><th>विभक्तिः</th><th>अस्मद् (एक० / द्वि० / बहु०)</th><th>युष्मद् (एक० / द्वि० / बहु०)</th></tr>
  <tr><td><strong>प्रथमा</strong></td><td>अहम् / आवाम् / वयम्</td><td>त्वम् / युवाम् / यूयम्</td></tr>
  <tr><td><strong>द्वितीया</strong></td><td>माम् (मा) / आवाम् (नौ) / अस्मान् (नः)</td><td>त्वाम् (त्वा) / युवाम् (वाम्) / युष्मान् (वः)</td></tr>
  <tr><td><strong>तृतीया</strong></td><td>मया / आवाभ्याम् / अस्माभिः</td><td>त्वया / युवाभ्याम् / युष्माभिः</td></tr>
  <tr><td><strong>षष्ठी</strong></td><td>मम (मे) / आवयोः (नौ) / अस्माकम् (नः)</td><td>तव (ते) / युवयोः (वाम्) / युष्माकम् (वः)</td></tr>
</table>

<div class="section-title">५. पञ्च-लकाराणां तिङ्-प्रत्यय-सङ्केताः (Conjugation Formula Suffixes)</div>
<table>
  <tr><th>लकारः</th><th>प्रथमपुरुषः (३rd)</th><th>मध्यमपुरुषः (२nd)</th><th>उत्तमपुरुषः (१st)</th></tr>
  <tr><td><strong>लट् (Present)</strong></td><td>-ति, -तः, -न्ति</td><td>-सि, -थः, -थ</td><td>-मि, -वः, -मः</td></tr>
  <tr><td><strong>लृट् (Future)</strong></td><td>-ष्यति, -ष्यतः, -ष्यन्ति</td><td>-ष्यसि, -ष्यथः, -ष्यथ</td><td>-ष्यामि, -ष्यावः, -ष्यामः</td></tr>
  <tr><td><strong>लङ् (Past)</strong></td><td>अ-...-त्, अ-...-ताम्, अ-...-न्</td><td>अ-...-ः, अ-...-तम्, अ-...-त</td><td>अ-...-म्, अ-...-व, अ-...-म</td></tr>
  <tr><td><strong>लोट् (Imperative)</strong></td><td>-तु, -ताम्, -न्तु</td><td>- , -तम्, -त</td><td>-आनि, -आव, -आम</td></tr>
  <tr><td><strong>विधिलिङ् (Potential)</strong></td><td>-एत्, -एताम्, -एयुः</td><td>-एः, -एतम्, -एत</td><td>-एयम्, -एव, -एम</td></tr>
</table>

<div class="footer">
  EdNet Learn Gurukul Grammar Essentials · www.ednetlearn.in · Free Printable Revision Sheet
</div>
</body>
</html>"""

# 3. Shiva Sutras & Mouth Articulation Map
html_shiva_sutras = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>Shiva Sutras & Anatomical Vocal Articulation Map</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">Paninian Phonetics &amp; Articulatory Acoustics</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>14 Māheśvara Sūtras</strong><br>Acoustics &amp; IPA Map
  </div>
</div>

<div class="doc-title">Shiva Sutras &amp; Anatomical Vocal Articulation Map</div>
<div class="doc-sa">माहेश्वर-सूत्राणि मुख-स्थान-चित्रं प्रत्याहार-सारणी च</div>

<div class="section-title">१. चतुर्दश माहेश्वर-सूत्राणि (The 14 Shiva Sutras of Pāṇini)</div>
<table>
  <tr><th>क्र०</th><th>सूत्रम् (Sūtra)</th><th>ध्वनि-प्रकारः (Phonetic Class)</th><th>इत्-वर्णः (Marker)</th></tr>
  <tr><td>१</td><td><strong>अ इ उ ण्</strong></td><td>मूल-स्वराः (Short Simple Vowels: a, i, u)</td><td>ण्</td></tr>
  <tr><td>२</td><td><strong>ऋ ऌ क्</strong></td><td>मूर्धन्य-दन्त्य-स्वराः (Vocalic liquids: ṛ, ḷ)</td><td>क्</td></tr>
  <tr><td>३</td><td><strong>ए ओ ङ्</strong></td><td>गुण-स्वराः (Mid Vowels: e, o)</td><td>ङ्</td></tr>
  <tr><td>४</td><td><strong>ऐ औ च्</strong></td><td>वृद्धि-स्वराः (Diphthongs: ai, au)</td><td>च्</td></tr>
  <tr><td>५</td><td><strong>ह य व र ट्</strong></td><td>हकारः अन्तःस्थाश्च (Semivowels: y, v, r)</td><td>ट्</td></tr>
  <tr><td>६</td><td><strong>ल ण्</strong></td><td>पार्श्विकः अन्तःस्थः (Lateral semivowel: l)</td><td>ण्</td></tr>
  <tr><td>७</td><td><strong>ञ म ङ ण न म्</strong></td><td>नासिक्याः (Class Nasals: ñ, m, ṅ, ṇ, n)</td><td>म्</td></tr>
  <tr><td>८</td><td><strong>झ भ ञ्</strong></td><td>महाप्राण-घोष-वर्गाः (Voiced Aspirated Stops 4th: jh, bh)</td><td>ञ्</td></tr>
  <tr><td>९</td><td><strong>घ ढ ध ष्</strong></td><td>महाप्राण-घोष-वर्गाः (Voiced Aspirated Stops 4th: gh, ḍh, dh)</td><td>ष्</td></tr>
  <tr><td>१०</td><td><strong>ज ब ग ड द श्</strong></td><td>अल्पप्राण-घोष-वर्गाः (Voiced Unaspirated Stops 3rd: j, b, g, ḍ, d)</td><td>श्</td></tr>
  <tr><td>११</td><td><strong>ख फ छ ठ थ च ट त व्</strong></td><td>अघोष-वर्गाः (Voiceless Stops 2nd & 1st)</td><td>व्</td></tr>
  <tr><td>१२</td><td><strong>क प य्</strong></td><td>प्रथम-वर्णाः (Voiceless Stops 1st: k, p)</td><td>य्</td></tr>
  <tr><td>१३</td><td><strong>श ष स र्</strong></td><td>ऊष्म-वर्णाः (Sibilants / Fricatives: ś, ṣ, s)</td><td>र्</td></tr>
  <tr><td>१४</td><td><strong>ह ल्</strong></td><td>हकारः (Glottal Fricative: h)</td><td>ल्</td></tr>
</table>

<div class="section-title">२. वर्णोच्चारण-स्थानानि (Vocal Articulation Anatomy Map)</div>
<table>
  <tr><th>स्थानम् (Anatomical Site)</th><th>संस्कृत-सूत्रम् (Pāṇini Rule)</th><th>वर्णाः (Phonemes)</th><th>ध्वनि-प्रकारः</th></tr>
  <tr><td><strong>कण्ठः (Throat / Velar)</strong></td><td>अकुहविसर्जनीयानां कण्ठः</td><td>अ, आ, क, ख, ग, घ, ङ, ह, विसर्ग (:)</td><td>कण्ठ्य (Velar / Glottal)</td></tr>
  <tr><td><strong>तालु (Palate / Palatal)</strong></td><td>इचुयशानां तालु</td><td>इ, ई, च, छ, ज, झ, ञ, य, श</td><td>तालव्य (Palatal)</td></tr>
  <tr><td><strong>मूर्धा (Roof of Mouth)</strong></td><td>ऋटुरषाणां मूर्धा</td><td>ऋ, ॠ, ट, ठ, ड, ढ, ण, र, ष</td><td>मूर्धन्य (Retroflex)</td></tr>
  <tr><td><strong>दन्ताः (Teeth / Dental)</strong></td><td>ऌतुलसानां दन्ताः</td><td>ऌ, त, थ, द, ध, न, ल, स</td><td>दन्त्य (Dental)</td></tr>
  <tr><td><strong>ओष्ठौ (Lips / Labial)</strong></td><td>उपूपध्मानीयानाम् ओष्ठौ</td><td>उ, ऊ, प, फ, ब, भ, म, उपध्मानीय</td><td>ओष्ठ्य (Bilabial)</td></tr>
  <tr><td><strong>नासिका (Nose / Nasal)</strong></td><td>ञमङणनानां नासिका च</td><td>ञ, म, ङ, ण, न, अनुस्वार (ं)</td><td>नासिक्य (Nasal Resonance)</td></tr>
  <tr><td><strong>कण्ठ-तालु</strong></td><td>एदैतोः कण्ठतालु</td><td>ए, ऐ</td><td>कण्ठतालव्य (Palato-Velar)</td></tr>
  <tr><td><strong>कण्ठ-ओष्ठम्</strong></td><td>ओदौतोः कण्ठोष्ठम्</td><td>ओ, औ</td><td>कण्ठौष्ठ्य (Labio-Velar)</td></tr>
  <tr><td><strong>दन्त-ओष्ठम्</strong></td><td>वकारस्य दन्तोष्ठम्</td><td>व</td><td>दन्तोष्ठ्य (Labio-Dental)</td></tr>
</table>

<div class="section-title">३. प्रत्याहार-संरचना (The Pratyāhāra Decoding Matrix)</div>
<div class="box">
  <strong>प्रत्याहार-नियमः (आदिरन्त्येन सहेता — १.१.७१):</strong><br>
  • <strong>अच्</strong> = सर्व-स्वराः (All Vowels = 9 fundamental vowels)<br>
  • <strong>हल्</strong> = सर्वे व्यञ्जन-वर्णाः (All 33 Consonants)<br>
  • <strong>अल्</strong> = सम्पूर्णा वर्णमाला (All 42 Letters of Sanskrit Alphabet)<br>
  • <strong>यण्</strong> = य, व, र, ल (Semi-vowels; used in यण्-सन्धिः: इ/उ/ऋ/ऌ ➔ य/व/र/ल)<br>
  • <strong>झल्</strong> = सर्वे वर्गीय-वर्णाः + ऊष्माणः (All stops + fricatives)
</div>

<div class="footer">
  EdNet Learn Gurukul Acoustics &amp; Phonetics Guide · www.ednetlearn.in · Printable Reference Sheet
</div>
</body>
</html>"""

# 4. CBSE Class 7 & 8 Blueprint Mock Exam Kit
html_mock_kit = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>CBSE Class 7 & 8 Sanskrit Pre-Term Blueprint Mock Exam & Solutions Kit</title>
<style>{CSS_STYLES}</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand-title">EdNet Learn Gurukul · संस्कृत-शिक्षणम्</div>
    <div class="brand-sub">CBSE Middle School Board Syllabus · Classes 7 &amp; 8 (NCERT Deepakam &amp; Ruchira)</div>
  </div>
  <div style="text-align: right; font-size: 9pt; color: #64748b;">
    <strong>Classes: 7 &amp; 8</strong><br>
    Time: 3 Hours · Max Marks: 80
  </div>
</div>

<div class="doc-title">CBSE Class 7 &amp; 8 Sanskrit: 80-Mark Blueprint Simulated Mock Examination</div>
<div class="doc-sa">सीबीएसई-कक्षा ७ एवं ८ संस्कृत-प्रतिदर्श-प्रश्नपत्रम् सविस्तर-मूल्याङ्कन-योजना च</div>

<div class="box">
  <strong>सामान्य-निर्देशाः (General Instructions for Classes 7 &amp; 8):</strong><br>
  १. अस्मिन् प्रश्नपत्रे चत्वारः खण्डाः सन्ति — खण्डः 'क' (अपठितम् - १० अङ्काः), खण्डः 'ख' (रचनात्मकम् - १५ अङ्काः), खण्डः 'ग' (व्याकरणम् - २५ अङ्काः), खण्डः 'घ' (पठितम् - ३० अङ्काः)।<br>
  २. सर्वे प्रश्नाः अनिवार्याः सन्ति। उत्तराणि शुद्धे देवनागरी-लिप्यामेव लेखनीयानि।
</div>

<div class="section-title">खण्डः 'क' — अपठित-अवबोधनम् (Section A: Unseen Comprehension - 10 Marks)</div>
<div class="box">
  <strong>गद्यांशः:</strong> संस्कृतभाषा विश्वस्य सर्वासु भाषासु प्राचीनतमा अस्ति। इयं देवभाषा, सुरभारती, गीर्वाणवाणी चेति कथ्यते। भारतस्य गौरवम्, अस्माकं संस्कृतिः च संस्कृतभाषायामेव सुरक्षिता। अस्याः व्याकरणं सुव्यवस्थितं वैज्ञानिकं च वर्तते। पाणिनि-मुनिना विरचिता अष्टाध्यायी अस्य प्रमाणम् अस्ति। अद्यत्वे सङ्गणक-क्षेत्रे अपि अस्याः भाषायाः उपयोगिता स्वीक्रियते।
</div>
<div class="q-block">
  <div class="q-title">१. एकपदेन उत्तरत (Answer in One Word - 2 Marks):</div>
  <p>(क) विश्वस्य प्राचीनतमा भाषा का? ➔ <span style="color:#166534; font-weight:700;">संस्कृतभाषा</span><br>
  (ख) अष्टाध्यायी केन विरचिता? ➔ <span style="color:#166534; font-weight:700;">पाणिनिना (पाणिनि-मुनिना)</span></p>
</div>
<div class="q-block">
  <div class="q-title">२. पूर्णवाक्येन उत्तरत (Answer in Full Sentence - 4 Marks):</div>
  <p><strong>प्रश्नः:</strong> संस्कृतभाषायाः उपयोगिता कस्मिन् आधुनिक-क्षेत्रे स्वीक्रियते?<br>
  <div class="q-ans"><strong>उत्तरम्:</strong> अद्यत्वे सङ्गणक-क्षेत्रे (Computer Science) अपि संस्कृतभाषायाः उपयोगिता स्वीक्रियते।</div></p>
</div>
<div class="q-block">
  <div class="q-title">३. भाषिक-कार्यम् (Grammar Clues - 4 Marks):</div>
  <p>• 'प्राचीनतमा' इत्यस्य विशेष्यपदं किम्? ➔ <strong>भाषा</strong><br>
  • गद्यांशे 'नूतना' पदस्य विलोमपदं किम्? ➔ <strong>प्राचीनतमा</strong><br>
  • समुचितं शीर्षकं लिखत ➔ <strong>'संस्कृतभाषायाः महत्त्वम्' / 'सुरभारती'</strong></p>
</div>

<div class="section-title">खण्डः 'ख' — रचनात्मक-कार्यम् (Section B: Creative Writing - 15 Marks)</div>
<div class="q-block">
  <div class="q-title">१. चित्रवर्णनम् (Picture Composition - 10 Marks):</div>
  <p>चित्रं दृष्ट्वा मञ्जूषायाः साहाय्येन पञ्च वाक्यानि संस्कृतेन रचयत:<br>
  <strong>मञ्जूषा:</strong> [ उद्यानम्, वृक्षाः, बालकाः, कन्दुकेन, क्रीडन्ति, विकसन्ति, पुष्पाणि, खगाः, आकाशे ]<br>
  <div class="q-ans">
    १. इदम् एकस्य रम्यस्य उद्यानस्य चित्रम् अस्ति। (This is a picture of a lovely park.)<br>
    २. उद्याने विविधाः हरिताः वृक्षाः मनोहराणि पुष्पाणि च सन्ति।<br>
    ३. बालकाः प्रसन्नेन मनसा कन्दुकेन सह क्रीडन्ति।<br>
    ४. वृक्षाणां शाखासु खगाः कलरवं कुर्वन्ति।<br>
    ५. जनाः प्रातःकाले भ्रमणाय उद्याने आगच्छन्ति।
  </div></p>
</div>
<div class="q-block">
  <div class="q-title">२. संवाद-पूर्तिः (Dialogue Completion - 5 Marks):</div>
  <p>माता-पुत्रयोः संवादं मञ्जूषातः पूरयत:<br>
  <strong>माता:</strong> वत्स! त्वं कुत्र गच्छसि? ➔ <strong>पुत्रः:</strong> मातः! अहम् <span style="color:#166534; font-weight:700;">विद्यालयं</span> गच्छामि।<br>
  <strong>माता:</strong> तव हस्ते किं वर्तते? ➔ <strong>पुत्रः:</strong> मम हस्ते <span style="color:#166534; font-weight:700;">पुस्तकं</span> वर्तते।</p>
</div>

<div class="section-title">खण्डः 'ग' — अनुप्रयुक्त-व्याकरणम् (Section C: Applied Grammar - 25 Marks)</div>
<div class="q-block">
  <div class="q-title">१. सन्धि-सन्धिच्छेदं वा कुरुत (5 Marks):</div>
  <p>• <strong>विद्या + आलयः</strong> = विद्यालयः (दीर्घसन्धिः)<br>
  • <strong>सूर्य + उदयः</strong> = सूर्योदयः (गुणसन्धिः)<br>
  • <strong>यदि + अपि</strong> = यद्यपि (यण्सन्धिः)<br>
  • <strong>इत्यादि</strong> = इति + आदि<br>
  • <strong>पौ + अकः</strong> = पावकः (अयादिसन्धिः)</p>
</div>
<div class="q-block">
  <div class="q-title">२. शब्दरूप-रिक्तस्थानानि पूरयत (8 Marks):</div>
  <p>• बालक (तृतीया बहुवचनम्): <strong>बालकैः</strong><br>
  • लता (पञ्चमी एकवचनम्): <strong>लतायाः</strong><br>
  • फल (सप्तमी बहुवचनम्): <strong>फलेषु</strong><br>
  • अस्मद् (षष्ठी एकवचनम्): <strong>मम</strong></p>
</div>
<div class="q-block">
  <div class="q-title">३. धातुरूप-प्रयोगः (8 Marks):</div>
  <p>• छात्राः विद्यालये पुस्तकं (पठ् - लट् बहुवचनम्) ➔ <strong>पठन्ति</strong><br>
  • श्वः वयं भ्रमणाय (गम् - लृट् उत्तम-बहुवचनम्) ➔ <strong>गमिष्यामः</strong><br>
  • सः ह्यः पाठम् (लिख् - लङ् प्रथम-एकवचनम्) ➔ <strong>अलिखत्</strong><br>
  • हे बालकाः! सदा सत्यं (वद् - लोट् मध्यम-बहुवचनम्) ➔ <strong>वदत</strong></p>
</div>
<div class="q-block">
  <div class="q-title">४. प्रत्यय-संयोजनम् (4 Marks):</div>
  <p>• गम् + क्त्वा = <strong>गत्वा</strong> | पठ् + तुमुन् = <strong>पठितुम्</strong> | दा + क्त्वा = <strong>दत्त्वा</strong> | हस् + शतृ = <strong>हसन्</strong></p>
</div>

<div class="section-title">खण्डः 'घ' — पठित-अवबोधनम् (Section D: Textbook Comprehension - 30 Marks)</div>
<div class="q-block">
  <div class="q-title">१. श्लोकान्वयः भावार्थश्च (NCERT Deepakam & Ruchira - 10 Marks):</div>
  <p><em>पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते॥</em><br>
  <strong>अन्वयः:</strong> पृथिव्यां जलम्, अन्नम्, सुभाषितं च (इति) त्रीणि रत्नानि सन्ति। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते।</p>
  <div class="q-ans"><strong>भावार्थः:</strong> संसार में सच्चा धन ज्ञान, जल और अन्न है। भोग-विलास के पत्थरों को रत्न मानना अज्ञानता है।</div>
</div>
<div class="q-block">
  <div class="q-title">२. गद्यांश-अवबोधनम् (Textual Passage - 10 Marks):</div>
  <p><em>'सेवा हि परमो धर्मः' — परोपकाराय सतां विभूतयः। वृक्षाः परोपकाराय फलन्ति, नद्यः परोपकाराय वहन्ति।</em><br>
  (क) सतां विभूतयः किमर्थं भवन्ति? ➔ <strong>परोपकाराय</strong><br>
  (ख) के परोपकाराय वहन्ति? ➔ <strong>नद्यः</strong></p>
</div>
<div class="q-block">
  <div class="q-title">३. प्रश्ननिर्माणं कुरुत (Form Questions Using Kim-Family - 10 Marks):</div>
  <p>• बालकाः <u>कन्दुकेन</u> क्रीडन्ति। ➔ बालकाः <strong>केन</strong> क्रीडन्ति?<br>
  • सः <u>पोर्टब्लेयर-नगरे</u> वसति। ➔ सः <strong>कुत्र</strong> वसति?<br>
  • <u>पन्नाधाया</u> राजकुमारम् अरक्षत्। ➔ <strong>का</strong> राजकुमारम् अरक्षत्?<br>
  • <u>ज्ञानाय</u> विद्या आवश्यकी। ➔ <strong>कस्मै</strong> विद्या आवश्यकी?</p>
</div>

<div class="footer">
  EdNet Learn Gurukul · CBSE Sanskrit Class 7 &amp; 8 Blueprint Mock Exam &amp; Marking Scheme · www.ednetlearn.in
</div>
</body>
</html>"""

# Generate all 4 publication PDFs
generate_pdf(html_qb_all15, "CBSE_Class7_Sanskrit_Deepakam_Master_Question_Bank.pdf")
generate_pdf(html_cheat_sheet, "Sanskrit_Shabdroop_Dhaturoop_Master_Cheat_Sheet.pdf")
generate_pdf(html_shiva_sutras, "Paninian_Shiva_Sutras_Phonetic_Mouth_Map.pdf")
generate_pdf(html_mock_kit, "CBSE_Sanskrit_Blueprint_Mock_Exam_Kit.pdf")
print("All 4 study vault PDFs successfully regenerated!")
