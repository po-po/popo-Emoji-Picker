/*
 * MIT License
 *
 * Copyright (c) 2024 popo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const imageType = 'apple'; // apple google twitter facebook
const cdnRoot = `https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/emoji-datasource-${imageType}/15.1.2`;
const imageCols = 62;
const cssVars = {
    '--emoji-background-image': `url(${cdnRoot}/img/${imageType}/sheets-128/64.png)`,
    '--emoji-background-image-cols': imageCols,
};
for (let [key, value] of Object.entries(cssVars)) {
    document.documentElement.style.setProperty(key, value.toString());
}

const languageMap = {
    'Recently Used': '最近使用',
    'Smileys & Emotion': '笑脸&表情',
    'People & Body': '人物&身体',
    'Animals & Nature': '动物&自然',
    'Food & Drink': '食物&饮品',
    'Travel & Places': '旅游&地点',
    Activities: '活动',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    'No Emoji Found': '未搜到表情',
    Search: '搜索',
    'Search Result': '搜索结果',
    'Pick Your Skin Tone': '选择你的肤色',
    Backspace: '退格',
    'Please Enter Search Keywords': '请输入搜索关键字...',
    Close: '关闭',
};

console.log(languageMap);

let $t = (string) => {
    return languageMap[string] || string;
};

function setEmojiStyle(item) {
    if (item) {
        const cols = imageCols || 62;
        const multiply = 100 / (cols - 1);
        const x = multiply * item.sheet_x;
        const y = multiply * item.sheet_y;

        return x.toFixed(4) + '% ' + y.toFixed(4) + '%';
    } else {
        return '0 0';
    }
}

function nativeToUnified(native) {
    const unicodeArray = [];
    for (let i = 0; i < native.length; i++) {
        const codePoint = native.codePointAt(i).toString(16).toUpperCase();
        unicodeArray.push(codePoint.padStart(4, '0'));
        if (codePoint.length > 4) i++;
    }
    return unicodeArray.join('-');
}

function unifiedToNative(unified) {
    let unicode = unified.split('-');
    let codePoints = unicode.map((u) => parseInt(u, 16));
    return String.fromCodePoint(...codePoints);
}

function emojiTransform(value, type = 'native') {
    let content = value;
    if (!content) return;

    const emojiRegex =
        /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    const imgTagRegex = /<img[^>]*>/gi;
    const colonRegex = /:[a-zA-Z0-9_-]+:/g;

    content = content.replace(colonRegex, (match) => {
        const unified = match.replace(/:/g, '');
        let codePoints = unified.split('-').map((u) => parseInt(u, 16));
        return String.fromCodePoint(...codePoints);
    });

    if (type === 'image') {
        return content.replace(emojiRegex, (match) => {
            const unified = nativeToUnified(match);
            let codePoints = unified.split('-').map((u) => parseInt(u, 16));
            return `<img src="${cdnRoot}/img/${imageType}/64/${unified.toLowerCase()}.png" class="emoji _" data-unified="${unified}" title="${String.fromCodePoint(...codePoints)}">`;
        });
    } else if (type === 'native') {
        return content.replace(imgTagRegex, (match) => {
            const unified = match.match(/data-unified="([^"]+)"/)[1];
            let codePoints = unified.split('-').map((u) => parseInt(u, 16));
            return String.fromCodePoint(...codePoints);
        });
    } else if (type === 'unicode') {
        return content
            .replace(emojiRegex, (match) => {
                return `:${nativeToUnified(match)}:`;
            })
            .replace(imgTagRegex, (match) => {
                const unified = match.match(/data-unified="([^"]+)"/)[1];
                return `:${unified}:`;
            });
    } else {
        return new Error('Please enter the correct conversion format (image/native/unicode)');
    }
}

class InputHandler {
    constructor(options) {
        this.options = {
            maxLength: null,
            isMobile: false,
            ...options,
        };
        this.inputElement = this.options.inputElement;
        this.range = null;
        this.lasContent = null;
        this.inputValueLength = 0;
        this.init();
    }
    init() {
        const editableDiv = this.inputElement;
        editableDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.getRange();

                const range = this.range;
                if (!range.collapsed) range.deleteContents();
                const endsWithNewLine = this.inputElement.lastChild?.textContent === range.startContainer.textContent && range.startContainer.textContent.length === range.startOffset;

                const brNode = document.createTextNode(endsWithNewLine ? '\n\n' : '\n');
                range.insertNode(brNode);

                range.setStartAfter(brNode);
                range.setEndAfter(brNode);

                this.inputChange();
            }
        });
        editableDiv.addEventListener(
            'click',
            () => {
                this.getRange();
            },
            false
        );
        editableDiv.addEventListener(
            'input',
            () => {
                this.getRange();
                this.inputChange();
            },
            false
        );
        editableDiv.addEventListener(
            'paste',
            () => {
                this.getRange();
                this.inputChange();
            },
            false
        );
    }
    destroy() {
        this.range = null;
        this.inputElement.removeEventListener('keydown', this.init);
        this.inputElement.removeEventListener('click', this.getRange);
        this.inputElement.removeEventListener('input', this.getRange);
        this.inputElement.removeEventListener('paste', this.getRange);
    }
    inputChange() {
        const length = this.getLength();
        const maxLength = this.options.maxLength;
        if (maxLength && length > maxLength) {
            this.inputElement.blur();
            this.inputElement.innerHTML = this.lasContent;
        } else {
            this.options.inputChange?.({
                result: this.inputElement.innerHTML,
                length: length,
                maxLength: maxLength,
            });
            this.lasContent = this.inputElement.innerHTML;

            if (!this.options.isMobile && this.range) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.range);
            }
        }
    }
    getRange() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            this.range = selection.getRangeAt(0);
        }
    }
    lastNodeLength(str) {
        if (!str) return 1;
        const segmenter = new Intl.Segmenter(undefined, {
            granularity: 'grapheme',
        });
        const segments = Array.from(segmenter.segment(str));
        const lastNode = segments[segments.length - 1];
        return lastNode.segment.length;
    }
    setRangeContent(node) {
        const range = this.range;
        const startContent = node.textContent.slice(0, range.startOffset).toString();
        const len = this.lastNodeLength(startContent);
        const endIndex = range.startOffset - len;
        const startStr = node.textContent.slice(0, endIndex);
        const endStr = node.textContent.slice(range.endOffset, node.textContent.length);
        node.textContent = startStr + endStr;

        range.setStart(node, endIndex);
        range.setEnd(node, endIndex);
    }
    removePrevNode(prevNode) {
        if (!prevNode) return;
        if (prevNode.textContent.length) {
            prevNode.textContent = prevNode.textContent.slice(0, -this.lastNodeLength(prevNode.textContent));
            this.range.setStartAfter(prevNode.lastChild || prevNode);
            this.range.setEndAfter(prevNode.lastChild || prevNode);
            if (prevNode.textContent.length === 0) prevNode.remove();
        } else {
            prevNode.remove();
        }
    }
    backSpace() {
        if (this.inputValueLength === 0) return;

        const range = this.range;
        const editableDiv = this.inputElement;
        editableDiv.blur();
        const node = range ? range.startContainer : editableDiv.lastChild;

        if (!node) return;

        if (range && !range.collapsed) {
            range.deleteContents();
            const lastNode = range.startContainer.childNodes[range.startOffset - 1]?.lastChild;
            if (lastNode) {
                range.setStartAfter(lastNode);
                range.setEndAfter(lastNode);
            }
            return;
        }

        if (range) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (range.startOffset > 0) {
                    this.setRangeContent(node);
                } else {
                    let prevNode = node.previousSibling || node.parentNode.previousSibling;
                    this.removePrevNode(prevNode);
                }
            } else {
                const isInputSelf = node.classList.contains(this.inputElement.className);
                const prevNode = isInputSelf ? node.childNodes[range.startOffset - 1] : node.lastChild;
                this.removePrevNode(prevNode);
            }
        } else {
            let rangeNode = node;
            if (rangeNode.nodeType === Node.TEXT_NODE) {
                rangeNode.textContent = rangeNode.textContent.slice(0, -this.lastNodeLength(rangeNode.textContent));
            } else {
                const prevNode = node.previousSibling;
                if (prevNode) {
                    rangeNode = prevNode;
                }
                node.remove();
            }
            this.range = document.createRange();
            this.range.setStartAfter(rangeNode);
            this.range.setEndAfter(rangeNode);
        }

        this.inputChange();
    }
    insertNode(node) {
        const range = this.range;
        if (range) {
            range.insertNode(node);
            range.setStartAfter(node);
            range.setEndAfter(node);
        } else {
            this.inputElement.appendChild(node);
            this.range = document.createRange();
            this.range.setStartAfter(node);
            this.range.setEndAfter(node);
        }
        this.inputChange();
    }
    setValue(value) {
        const isText = /<\/?[a-z][\s\S]*>/i.test(value);
        this.inputElement[isText ? 'textContent' : 'innerHTML'] = value;
        this.inputChange();
    }
    getLength() {
        const segmenter = new Intl.Segmenter(undefined, {
            granularity: 'grapheme',
        });
        const str = this.inputElement.textContent;
        const segments = Array.from(segmenter.segment(str));
        const images = this.inputElement.querySelectorAll('img');
        this.inputValueLength = segments.length + images.length;
        return this.inputValueLength;
    }
}

class VirtualList {
    constructor(options) {
        this.options = options || {};
        const { container, data, itemHeight, rows, cols, isMobile, emojiStyle, isNative } = this.options;
        this.container = container;
        this.data = data;
        this.itemHeight = itemHeight;
        this.cols = cols;
        this.isMobile = isMobile;
        this.emojiStyle = emojiStyle;
        this.isNative = isNative;

        this.visibleData = [];
        this.buffer = [];

        this.container.style.height = `${itemHeight * rows}px`;
        this.container.style.overflow = 'auto';
        this.listContainer = document.createElement('div');
        this.listContainer.style.height = `${this.data.length * this.itemHeight}px`;
        this.listContainer.style.position = 'relative';
        this.container.appendChild(this.listContainer);
        this.skinToneSelector = null;

        this.updateVisibleData();

        this.addContainerEventListeners();
    }

    setNative(isNative) {
        this.isNative = isNative;
    }

    reload(data) {
        this.data = data;
        this.visibleData = [];
        this.buffer = [];
        this.listContainer.textContent = '';
        this.listContainer.style.height = `${this.data.length * this.itemHeight}px`;
        this.container.textContent = '';
        this.container.appendChild(this.listContainer);
        this.updateVisibleData();

        if (data.length === 1) {
            const noData = document.createElement('div');
            noData.className = 'p-emoji-no-data';
            noData.textContent = $t('No Emoji Found');
            this.container.appendChild(noData);
        }
    }

    updateVisibleData() {
        const viewportHeight = this.container.clientHeight;
        const visibleItemCount = Math.ceil(viewportHeight / this.itemHeight);
        const bufferCount = visibleItemCount;

        const firstVisibleIndex = Math.max(0, Math.floor(this.container.scrollTop / this.itemHeight) - bufferCount);
        const lastVisibleIndex = Math.min(this.data.length, firstVisibleIndex + visibleItemCount + 2 * bufferCount);

        this.recycleItems(firstVisibleIndex, lastVisibleIndex);
        this.createItems(firstVisibleIndex, lastVisibleIndex);

        if (this.options.scrollCallback) this.options.scrollCallback(this.container.scrollTop);
    }

    addContainerEventListeners() {
        let longPressTimer = null;
        let mouseDownTime = 0;
        let longPressTriggered = false;
        let isMoved = false;

        const getDomEmojiData = (e) => {
            if (e.target.dataIndex) {
                const i = e.target.dataIndex.split('-').map((i) => Number(i));
                const rows = i[0];
                const cols = i[1];
                return this.data[rows][cols];
            } else {
                return e.target.data;
            }
        };

        this.container.addEventListener(
            this.isMobile ? 'touchstart' : 'mousedown',
            (e) => {
                const target = ['.p-emoji-col', 'p-emoji-col-arrow'].some((el) => e.target.closest(el));
                if (!target) {
                    longPressTriggered = true;
                    return;
                }

                if (!this.isMobile && e.target.className === 'p-emoji-col-arrow') {
                    const emojiData = getDomEmojiData(e);
                    this.createSkinToneSelector(emojiData);
                    return;
                }
                if (e.target.isSkinTone) {
                    this.skinToneSelector.classList.add('hide-anim');
                    setTimeout(() => {
                        this.skinToneSelector.remove();
                    }, 300);
                }

                isMoved = false;
                mouseDownTime = Date.now();
                longPressTriggered = false;
                clearTimeout(longPressTimer);
                longPressTimer = setTimeout(() => {
                    if (!isMoved) {
                        longPressTriggered = true;
                        const emojiData = getDomEmojiData(e);
                        if (emojiData && emojiData.skin_variations) this.createSkinToneSelector(emojiData);
                    }
                }, 500);
            },
            false
        );

        this.container.addEventListener(
            this.isMobile ? 'touchmove' : 'mousemove',
            () => {
                if (this.isMobile) isMoved = true;
            },
            false
        );

        this.container.addEventListener(
            this.isMobile ? 'touchend' : 'mouseup',
            (e) => {
                e.preventDefault();

                // 清除长按计时器
                clearTimeout(longPressTimer);

                // 如果长按已触发，不再处理点击
                if (longPressTriggered) return;

                // 计算按下的持续时间
                const pressDuration = Date.now() - mouseDownTime;
                if (pressDuration < 500 && !isMoved) {
                    // 持续时间小于500毫秒，认为是点击
                    const emojiData = getDomEmojiData(e);
                    if (emojiData) {
                        this.options.clickCallback?.(emojiData);
                    }
                }
            },
            false
        );

        this.container.addEventListener('scroll', () => this.updateVisibleData());
    }

    createSkinToneSelector(emojiData) {
        console.log(emojiData);
        const lastNode = [...this.container.childNodes].find((node) => node.className === 'p-emoji-skin-tone-wrapper');
        if (lastNode) lastNode.remove();

        const fragment = document.createDocumentFragment();
        const skinToneSelector = document.createElement('div');
        this.skinToneSelector = skinToneSelector;

        // 选择肤色标题
        skinToneSelector.className = 'p-emoji-skin-tone-wrapper show-anim';
        const skinToneSelectorTitle = document.createElement('div');
        skinToneSelectorTitle.textContent = $t('Pick Your Skin Tone');
        skinToneSelectorTitle.className = 'p-emoji-skin-tone-title';
        skinToneSelector.appendChild(skinToneSelectorTitle);

        // 关闭按钮
        const closeButton = document.createElement('button');
        closeButton.dataset.title = $t('Close');
        closeButton.title = $t('Close');
        closeButton.className = `p-emoji-header-button`;
        closeButton.addEventListener(
            this.isMobile ? 'touchstart' : 'click',
            () => {
                skinToneSelector.classList.add('hide-anim');
                setTimeout(() => {
                    skinToneSelector.remove();
                }, 300);
            },
            false
        );
        skinToneSelectorTitle.appendChild(closeButton);

        // 肤色选择器
        const childRow = document.createElement('div');
        childRow.className = 'p-emoji-skin-tone-body';

        const skinMaps = { emojiData, ...emojiData.skin_variations };
        for (const key in skinMaps) {
            const item = { ...emojiData, ...skinMaps[key] };
            const childCol = document.createElement('div');
            if (this.isNative) {
                childCol.textContent = unifiedToNative(item.unified);
            } else {
                const emoji = document.createElement('div');
                emoji.className = 'emoji';
                emoji.style.backgroundPosition = setEmojiStyle(item);
                childCol.appendChild(emoji);
            }

            childCol.title = emojiData.short_name;
            childCol.className = 'p-emoji-col';
            childCol.style.width = `${this.itemHeight}px`;
            childCol.style.height = `${this.itemHeight}px`;
            childCol.data = item;
            childCol.isSkinTone = true;

            childRow.appendChild(childCol);
        }
        skinToneSelector.appendChild(childRow);

        fragment.appendChild(skinToneSelector);
        this.container.appendChild(fragment);
    }

    recycleItems(firstVisibleIndex, lastVisibleIndex) {
        this.visibleData = this.visibleData.filter((item) => {
            if (item.index < firstVisibleIndex || item.index >= lastVisibleIndex) {
                this.buffer.push(item);
                return false;
            }
            return true;
        });
    }

    createItems(firstVisibleIndex, lastVisibleIndex) {
        const mainFragment = document.createDocumentFragment();
        for (let index = firstVisibleIndex; index < lastVisibleIndex; index++) {
            let item = this.visibleData.find((item) => item.index === index);
            if (!item) {
                item = this.buffer.length > 0 ? this.buffer.pop() : { element: document.createElement('div') };
                const data = this.data[index];
                const fragment = document.createDocumentFragment();
                if (data.title) {
                    const titleItem = document.createElement('div');
                    titleItem.textContent = $t(data.title);
                    titleItem.className = 'p-emoji-title';
                    titleItem.style.height = `${this.itemHeight}px`;
                    fragment.appendChild(titleItem);
                } else {
                    for (let i = 0; i < this.cols; i++) {
                        const item = data[i];
                        if (item && item.unified) {
                            const childCol = document.createElement('div');
                            if (this.isNative) {
                                childCol.textContent = unifiedToNative(item.unified);
                            } else {
                                const emoji = document.createElement('div');
                                emoji.className = 'emoji';
                                emoji.style.backgroundPosition = setEmojiStyle(item);
                                childCol.appendChild(emoji);
                            }

                            childCol.title = item.short_name;
                            childCol.className = 'p-emoji-col' + (item.skin_variations ? ' arrow' : '');
                            childCol.style.width = `${100 / this.cols}%`;
                            childCol.style.height = `${this.itemHeight}px`;
                            childCol.dataIndex = `${index}-${i}`;

                            // skin tone arrow
                            if (data[i].skin_variations) {
                                const arrow = document.createElement('div');
                                arrow.className = 'p-emoji-col-arrow';
                                arrow.data = data[i];
                                childCol.appendChild(arrow);
                            }

                            fragment.appendChild(childCol);
                        }
                    }
                }

                item.index = index;
                // item.element.textContent = this.data[index];
                item.element.textContent = '';
                item.element.appendChild(fragment);
                item.element.className = `p-emoji-row`;
                item.element.style.transform = `translate3d(0,${index * this.itemHeight}px,0)`;
                item.element.style.height = `${this.itemHeight}px`;

                this.visibleData.push(item);
                mainFragment.appendChild(item.element);
            }
        }
        this.listContainer.appendChild(mainFragment);
    }
}

class EmojiPicker {
    constructor(options) {
        this.options = {
            inputElement: '',
            toggleButtonElement: '',
            theme: 'light',
            itemHeight: 40,
            groupSize: 9,
            rows: 6,
            isNative: false,
            placeholder: '',
            showWordLimit: false,
            maxLength: null,
            language: 'en', // en, zh-CN
            created: () => {},
            inputChange: () => {},
            ...options,
        };

        this.vList = null;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.remoteData = [];
        this.categoryPos = [];
        this.headerBuffer = [];
        this.headerPreviousIdx = -1;
        this.isOpen = false;
        this.recentlyUsedData = [];
        this.init();
    }

    init() {
        this.inputHander = this.createInputWrapper();
        this.options?.toggleButtonElement.addEventListener('click', (e) => {
            this.togglePicker();
        });

        this.options.created(this);
    }

    createInputWrapper() {
        if (this.options.inputElement) {
            //create input box
            const inputElement = this.options.inputElement;
            inputElement.contentEditable = 'true';
            inputElement.style.whiteSpace = 'pre-wrap';
            inputElement.style.boxSizing = 'border-box';
            inputElement.setAttribute('placeholder', this.options.placeholder);

            // create input handler
            return new InputHandler({
                inputElement: inputElement,
                maxLength: this.options.maxLength,
                isMobile: this.isMobile,
                inputChange: (v) => {
                    this.options.inputChange(v);
                },
            });
        }
    }

    togglePicker() {
        if (this.isOpen) {
            this.mainContainer.remove();
        } else {
            this.open();
        }
        this.isOpen = !this.isOpen;
    }

    setPickerPosition() {
        const mainContainer = this.mainContainer;
        mainContainer.className = 'p-emoji-picker' + (this.options.theme === 'dark' ? ' p-theme-dark' : '');
        if (this.options.toggleButtonElement) {
            mainContainer.style.position = 'fixed';
            mainContainer.style.zIndex = '9999';
            const setPosition = () => {
                const { left, top, height } = this.options.toggleButtonElement.getBoundingClientRect();
                mainContainer.style.top = `${top + height + 5}px`;
                mainContainer.style.left = `${left - 10}px`;
            };
            setPosition();

            window.addEventListener('resize', () => setPosition());
        }
    }

    async open() {
        $t = (str) => (this.options.language === 'en' ? str : languageMap[str]); // i18n

        this.categoryPos = [];
        this.headerBuffer = [];
        this.headerPreviousIdx = -1;
        this.recentlyUsedData = JSON.parse(localStorage.getItem('p-emoji-recently-used') || '[]');

        // Generate the data
        let data = [];
        if (this.remoteData.length === 0) {
            data = await fetch(`${cdnRoot}/emoji.json`).then((res) => res.json());
            this.remoteData = data
                .filter((item) => item.category !== 'Component')
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((item) => ({
                    sheet_x: item.sheet_x,
                    sheet_y: item.sheet_y,
                    name: item.name,
                    short_name: item.short_name,
                    short_names: item.short_names,
                    unified: item.unified,
                    category: item.category,
                    skin_variations: item.skin_variations,
                }));
        }

        data = this.splitIntoGroups([...this.recentlyUsedData, ...this.remoteData], this.options.groupSize);

        const mainContainer = document.createElement('div');
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'p-emoji-scroll';
        mainContainer.appendChild(scrollContainer);
        document.body.appendChild(mainContainer);

        this.mainContainer = mainContainer;
        this.scrollContainer = scrollContainer;
        //this.enableMouseDragScroll(this.scrollContainer)

        // create header
        this.createHeader();

        // create virtual list
        this.vList = new VirtualList({
            container: this.scrollContainer,
            data: data,
            itemHeight: this.options.itemHeight,
            rows: this.options.rows,
            cols: this.options.groupSize,
            isMobile: this.isMobile,
            isNative: this.options.isNative,
            scrollCallback: (scrollTop) => {
                let idx = -1;
                for (let i = 0; i < this.headerBuffer.length; i++) {
                    if (scrollTop >= this.headerBuffer[i].position) idx = i;
                }

                if (idx !== -1 && idx !== this.headerPreviousIdx) {
                    const currentActive = document.querySelector('.p-emoji-header-button.active');
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    this.headerBuffer[idx].element.classList.add('active');
                    this.headerPreviousIdx = idx;
                }
            },
            clickCallback: (item) => {
                this.emojiClick(item);
            },
        });

        this.setTheme(this.options.theme);

        this.setPickerPosition();
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'p-emoji-header';

        const headerButtonGroup = document.createElement('div');
        headerButtonGroup.className = 'p-emoji-header-button-group';
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.categoryPos.length; i++) {
            const item = this.categoryPos[i];
            const headerButton = document.createElement('button');
            headerButton.textContent = '';
            headerButton.className = `p-emoji-header-button`;
            headerButton.dataset.title = item.title;
            headerButton.title = $t(item.title);
            headerButton.addEventListener(
                this.isMobile ? 'touchstart' : 'click',
                (e) => {
                    e.preventDefault();
                    this.scrollContainer.style.overflow = 'hidden';
                    this.scrollContainer.scrollTo({ top: item.position });
                    this.scrollContainer.style.overflow = 'auto';
                },
                false
            );
            fragment.appendChild(headerButton);
            this.headerBuffer.push({
                element: headerButton,
                position: item.position,
            });
        }

        // search button
        const searchBtn = document.createElement('button');
        searchBtn.className = `p-emoji-header-button`;
        searchBtn.dataset.title = 'Search';
        searchBtn.title = $t('Search');
        searchBtn.addEventListener(
            this.isMobile ? 'touchstart' : 'click',
            () => {
                header.classList.toggle('is-active');
            },
            false
        );
        fragment.appendChild(searchBtn);

        // backspace button
        const backspaceBtn = document.createElement('button');
        backspaceBtn.className = `p-emoji-header-button backspace`;
        backspaceBtn.title = $t('Backspace');
        backspaceBtn.addEventListener(
            this.isMobile ? 'touchstart' : 'click',
            () => {
                this.inputHander.backSpace();
            },
            false
        );
        fragment.appendChild(backspaceBtn);

        // append fragment
        headerButtonGroup.appendChild(fragment);

        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'p-emoji-header-search-wrapper';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = $t('Please Enter Search Keywords');
        searchInput.className = `p-emoji-search-input`;
        searchInput.addEventListener(
            'input',
            (e) => {
                this.emojiSearch(e.target.value);
            },
            false
        );
        searchWrapper.appendChild(searchInput);

        const searchInputCloseButton = document.createElement('button');
        searchInputCloseButton.dataset.title = 'Close';
        searchInputCloseButton.title = $t('Close');
        searchInputCloseButton.className = `p-emoji-header-button`;
        searchInputCloseButton.addEventListener(
            this.isMobile ? 'touchstart' : 'click',
            () => {
                searchInput.value = '';
                header.classList.toggle('is-active');
                this.emojiSearch();
            },
            false
        );
        searchWrapper.appendChild(searchInputCloseButton);

        header.appendChild(headerButtonGroup);
        header.appendChild(searchWrapper);

        this.mainContainer.insertBefore(header, this.scrollContainer);
    }

    emojiClick(item) {
        const index = this.recentlyUsedData.findIndex((i) => i.unified === item?.unified);

        if (index === -1) {
            const data = { ...item, category: 'Recently Used' };
            this.recentlyUsedData.unshift(data);
            this.recentlyUsedData = this.recentlyUsedData.slice(0, this.options.groupSize * 3);
        } else {
            const t = this.recentlyUsedData[index];
            this.recentlyUsedData.splice(index, 1);
            this.recentlyUsedData.unshift(t);
        }
        localStorage.setItem('p-emoji-recently-used', JSON.stringify(this.recentlyUsedData));

        if (this.options.isNative) {
            const text = document.createTextNode(unifiedToNative(item.unified));
            this.inputHander.insertNode(text);
        } else {
            const emojiNode = document.createElement('img');
            emojiNode.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';
            emojiNode.dataset.unified = item.unified;
            emojiNode.alt = item.unified;
            emojiNode.className = 'emoji';
            emojiNode.style.backgroundPosition = setEmojiStyle(item);
            this.inputHander.insertNode(emojiNode);
        }
    }

    emojiSearch(searchValue) {
        const list = searchValue ? this.remoteData : [...this.recentlyUsedData, ...this.remoteData];
        this.vList.reload(this.splitIntoGroups(list, this.options.groupSize, searchValue));
    }

    splitIntoGroups(data, groupSize, searchValue) {
        let array = data;
        const result = [];
        let currentCategory = null;
        let titleCount = 0;
        this.categoryPos = [];
        if (searchValue) {
            array = data.filter((i) => (i.short_names || []).some((ii) => ii.includes(searchValue)) || (i.name || '').toLowerCase().includes(searchValue));
            result.push({ title: $t('Search Result') });
        }

        for (let i = 0; i < array.length; i += groupSize) {
            let group = array.slice(i, i + groupSize);

            if (!searchValue) {
                const cutIdx = group.findIndex((i) => group[0].category !== i.category);

                if (cutIdx > -1) {
                    group = group.slice(0, cutIdx); // 截断非同类的末尾
                }

                const item = array[i];
                if (currentCategory !== item.category) {
                    result.push({ title: item.category });
                    this.categoryPos.push({
                        title: item.category,
                        position: Math.round(i / this.options.groupSize + titleCount) * this.options.itemHeight,
                    });
                    currentCategory = item.category;
                    titleCount++;
                }
            }

            result.push(group);
        }

        return result;
    }

    enableMouseDragScroll(element) {
        let isDown = false;
        let startY;
        let scrollTop;

        element.addEventListener('mousedown', (e) => {
            isDown = true;
            startY = e.pageY - element.offsetTop;
            scrollTop = element.scrollTop;
        });
        element.addEventListener('mouseleave', () => {
            isDown = false;
        });
        element.addEventListener('mouseup', () => {
            isDown = false;
        });
        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY - element.offsetTop;
            const walk = y - startY;
            element.scrollTop = scrollTop - walk;
        });
    }

    setValue(value) {
        this.inputHander?.setValue(value);
    }

    setNative(isNative) {
        this.options.isNative = isNative;
        this.vList.setNative(isNative);
        this.emojiSearch('');
    }

    setTheme(theme) {
        this.options.theme = theme;
        const classList = this.mainContainer.classList;
        const darkClass = 'p-theme-dark';
        classList.remove(darkClass);
        if (theme === 'dark') {
            classList.add(darkClass);
        } else if (theme === 'auto') {
            const isDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                classList.add(darkClass);
            } else {
                classList.remove(darkClass);
            }
        }
    }

    setLanguage(language) {
        this.options.language = language;
        this.mainContainer.remove();
        this.open();
    }
}

export { emojiTransform, EmojiPicker };
