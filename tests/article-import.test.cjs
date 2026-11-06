const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'..','document-import.js'),'utf8');
const context={Intl,TextDecoder,DataView,Set,Map,Array,Math,Error,Number,String};vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('function headingLevel('),source.indexOf('async function readArticleFile(')),context);
const text='設備改善計畫\n一、改善目標\n設備點檢必須每日執行。現場同仁應依標準完成清潔與潤滑。\n二、執行方法\n依風險安排點檢項目。每週檢查設備異常紀錄並追蹤改善。';
const blocks=context.plainArticleBlocks(text),outline=context.articleOutline(blocks,'設備管理',6,3);
assert(outline.includes('  一、改善目標'));assert(!outline.includes('  文章重點'));assert(outline.includes('  二、執行方法'));assert(outline.includes('每日執行'));assert(outline.split('\n').length<=1+6*4);
const paragraphs=context.articleOutline(context.plainArticleBlocks('每天落實清潔可以預防設備異常。設備點檢應由現場同仁執行。點檢紀錄需要完整保存。每週回顧故障原因。異常狀況應立即通報主管。改善後持續追蹤效果。'),'文章',6,3);assert(paragraphs.split('\n').length>3);assert(!paragraphs.includes('undefined'));
const many=Array.from({length:30},(_,i)=>[{text:'章節 '+i,heading:true},{text:'第 '+i+' 節介紹點檢與保全管理作業。',heading:false}]).flat();const compact=context.articleOutline(many,'大量章節',6,3);assert(compact.split('\n').filter(l=>/^  \S/.test(l)).length<=6);
assert.equal(context.decodeArticleText(new TextEncoder().encode('繁體中文測試').buffer),'繁體中文測試');assert.throws(()=>context.decodeArticleText(Uint8Array.from([0xff,0xff,0xff]).buffer),/UTF-8/);assert.throws(()=>context.articleOutline([], '空白'),/找不到/);
const malicious=context.articleOutline([{text:'<script>alert(1)</script> 這是一篇設備管理文章，請落實每日點檢。',heading:false}],'測試');assert(malicious.includes('<script>')); // Output is text, never executed as markup.
console.log('Passed: heading preservation, unstructured article grouping, bounded branches, UTF-8 decoding, invalid encoding/empty input handling, text-only outline output.');
