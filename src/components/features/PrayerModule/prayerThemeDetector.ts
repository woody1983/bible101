import type { PrayerTheme } from './prayerTemplates';
import { prayerTemplates } from './prayerTemplates';

/**
 * 根据用户输入检测祷告主题
 * 使用关键词匹配算法
 */
export function detectPrayerTheme(input: string): PrayerTheme {
  if (!input.trim()) {
    return 'petition'; // 默认主题
  }

  const lowerInput = input.toLowerCase();
  
  // 检查每个主题的关键词
  const themeScores: Record<PrayerTheme, number> = {
    thanksgiving: 0,
    petition: 0,
    confession: 0,
    intercession: 0,
    protection: 0,
    guidance: 0,
    worship: 0,
    healing: 0,
    repentance: 0,
    church: 0,
    nation: 0
  };

  // 计算每个主题的匹配分数
  (Object.keys(prayerTemplates) as PrayerTheme[]).forEach((theme) => {
    const template = prayerTemplates[theme];
    
    // 检查中文关键词
    template.keywords.zh.forEach((keyword) => {
      if (lowerInput.includes(keyword.toLowerCase())) {
        themeScores[theme]++;
      }
    });
    
    // 检查英文关键词
    template.keywords.en.forEach((keyword) => {
      if (lowerInput.includes(keyword.toLowerCase())) {
        themeScores[theme]++;
      }
    });
  });

  // 找到得分最高的主题
  let maxScore = 0;
  let detectedTheme: PrayerTheme = 'petition';
  
  (Object.keys(themeScores) as PrayerTheme[]).forEach((theme) => {
    if (themeScores[theme] > maxScore) {
      maxScore = themeScores[theme];
      detectedTheme = theme;
    }
  });

  // 如果没有匹配到任何关键词，返回默认主题
  return maxScore > 0 ? detectedTheme : 'petition';
}

/**
 * 简单的翻译映射（中文 -> 英文）
 * 用于将用户的中文输入转换为英文祷告文中的内容
 */
const translationMap: Record<string, string> = {
  // 基本词汇
  '感谢': 'giving thanks for',
  '感恩': 'gratitude for',
  '谢谢': 'thanksgiving for',
  '祝福': 'the blessings of',
  '求': 'asking for',
  '需要': 'my need for',
  '帮助': 'help with',
  '罪': 'my sins',
  '过错': 'my transgressions',
  '悔改': 'repentance from',
  '赦免': 'forgiveness for',
  '为': 'interceding for',
  '家人': 'my family',
  '朋友': 'my friends',
  '病人': 'the sick',
  '害怕': 'my fears',
  '担心': 'my anxieties',
  '保护': 'protection for',
  '平安': 'peace in',
  '迷茫': 'my confusion',
  '选择': 'wisdom in choosing',
  '方向': 'direction for',
  '智慧': 'wisdom for',
  '工作': 'my work',
  '学习': 'my studies',
  '健康': 'my health',
  '家庭': 'my family',
  '事业': 'my career',
  '婚姻': 'my marriage',
  '孩子': 'my children',
  '父母': 'my parents',
  '神': 'God',
  '主': 'the Lord',
  '耶稣': 'Jesus',
  '基督': 'Christ',
  '圣灵': 'the Holy Spirit',
  '教会': 'the church',
  '信心': 'my faith',
  '爱心': 'love',
  '喜乐': 'joy',
  '忍耐': 'patience',
  '温柔': 'gentleness',
  '良善': 'goodness',
  '节制': 'self-control',
  '谦卑': 'humility',
  '顺服': 'obedience',
  '奉献': 'dedication',
  '服侍': 'service',
  '传福音': 'evangelism',
  '见证': 'testimony',
  '医治': 'healing',
  '恢复': 'restoration',
  '更新': 'renewal',
  '复兴': 'revival',
  '合一': 'unity',
  '和睦': 'harmony',
  '饶恕': 'forgiveness',
  '恩典': 'grace',
  '怜悯': 'mercy',
  '慈爱': 'love',
  '信实': 'faithfulness',
  '公义': 'righteousness',
  '圣洁': 'holiness',
  '荣耀': 'glory',
  '权柄': 'authority',
  '能力': 'power',
  '胜利': 'victory',
  '自由': 'freedom',
  '释放': 'deliverance',
  '拯救': 'salvation',
  '永生': 'eternal life',
  '天国': 'Thy Kingdom',
  '旨意': 'Thy will',
  '道路': 'Thy way',
  '真理': 'Thy truth',
  '生命': 'life',
  '光': 'light',
  '羊': 'sheep',
  '牧人': 'shepherd',
  '门': 'door',
  '葡萄树': 'vine',
  '枝子': 'branches',
  '活水': 'living water',
  '吗哪': 'manna',
  '磐石': 'rock',
  '山寨': 'fortress',
  '盾牌': 'shield',
  '避难所': 'refuge',
  '高台': 'stronghold',
  '翅膀': 'wings',
  '荫下': 'shadow',
  '宝座': 'throne',
  '施恩座': 'mercy seat',
  '会幕': 'tabernacle',
  '圣殿': 'temple',
  '祭坛': 'altar',
  '燔祭': 'burnt offering',
  '素祭': 'grain offering',
  '平安祭': 'peace offering',
  '赎罪祭': 'sin offering',
  '赎愆祭': 'trespass offering',
  '大祭司': 'high priest',
  '中保': 'mediator',
  '保惠师': 'Comforter',
  '训慰师': 'Counselor',
  '真理的圣灵': 'Spirit of truth',
  '能力的圣灵': 'Spirit of power',
  '智慧的圣灵': 'Spirit of wisdom',
  '启示的圣灵': 'Spirit of revelation',
  '焚烧的圣灵': 'Spirit of burning',
  '七灵': 'seven Spirits',
  '天使': 'angels',
  '基路伯': 'cherubim',
  '撒拉弗': 'seraphim',
  '二十四位长老': 'twenty-four elders',
  '四活物': 'four living creatures',
  '大君王': 'King of kings',
  '万主之主': 'Lord of lords',
  '阿拉法': 'Alpha',
  '俄梅戛': 'Omega',
  '首先的': 'the First',
  '末后的': 'the Last',
  '初': 'the Beginning',
  '终': 'the End',
  '那自有永有的': 'I AM WHO I AM',
  '耶和华': 'Jehovah',
  '以罗欣': 'Elohim',
  '阿多奈': 'Adonai',
  '以勒': 'Jireh',
  '拉法': 'Rapha',
  '尼西': 'Nissi',
  '沙龙': 'Shalom',
  '萨巴俄': 'Sabaoth',
  '玛卡德什': 'Maccaddesh',
  '耶和华以勒': 'Jehovah-Jireh',
  '耶和华拉法': 'Jehovah-Rapha',
  '耶和华尼西': 'Jehovah-Nissi',
  '耶和华沙龙': 'Jehovah-Shalom',
  '耶和华萨巴俄': 'Jehovah-Sabaoth',
  '耶和华玛卡德什': 'Jehovah-Maccaddesh',
  '以马内利': 'Emmanuel',
  '奇妙的策士': 'Wonderful Counselor',
  '全能的神': 'Mighty God',
  '永在的父': 'Everlasting Father',
  '和平的君': 'Prince of Peace',
  '大卫的子孙': 'Son of David',
  '亚伯拉罕的后裔': 'Seed of Abraham',
  '女人的后裔': 'Seed of the woman',
  '神的羔羊': 'Lamb of God',
  '除去世人罪孽的': 'who taketh away the sin of the world',
  '逾越节的羔羊': 'Passover Lamb',
  '挽回祭': 'propitiation',
  '新约的中保': 'mediator of the new covenant',
  '更美之约的中保': 'mediator of a better covenant',
  '永远的大祭司': 'priest forever',
  '麦基洗德的等次': 'after the order of Melchizedek',
  '无邪恶': 'harmless',
  '无玷污': 'undefiled',
  '远离罪人': 'separate from sinners',
  '高过诸天': 'higher than the heavens',
  '永远常存': 'abideth forever',
  '祭司的职任不能更换': 'unchangeable priesthood',
  '救我们到底': 'able to save to the uttermost',
  '长远活着': 'ever liveth',
  '替我们祈求': 'to make intercession for us',
  '慈悲忠信的大祭司': 'merciful and faithful high priest',
  '受过试探': 'tempted',
  '与我们一样': 'like as we are',
  '能搭救被试探的人': 'able to succor them that are tempted',
  '因苦难学了顺从': 'learned obedience by the things which He suffered',
  '完全': 'perfect',
  '成为永远得救的根源': 'author of eternal salvation',
  '凡顺从祂的': 'unto all them that obey Him',
  '先锋': 'forerunner',
  '为我们进入幔内': 'entered in for us',
  '大祭司的祷告': 'high priestly prayer',
  '合而为一': 'that they may be one',
  '像祢我合一': 'as Thou, Father, art in me, and I in Thee',
  '世人可以信': 'that the world may believe',
  '未有世界以先': 'before the foundation of the world',
  '我同祢所有的荣耀': 'the glory which I had with Thee',
  '知道': 'know',
  '认识': 'know',
  '唯一的真神': 'thee only true God',
  '所差来的耶稣基督': 'Jesus Christ, whom Thou hast sent',
  '这就是永生': 'this is life eternal',
  '成圣': 'sanctify',
  '道': 'word',
  '差到世上': 'sent into the world',
  '分别为圣': 'set apart',
  '差他们到世上': 'send them into the world',
  '为他们的缘故': 'for their sakes',
  '自己分别为圣': 'I sanctify myself',
  '叫他们也因真理成圣': 'that they also might be sanctified through the truth',
  '我不求祢叫他们离开世界': 'I pray not that Thou shouldest take them out of the world',
  '只求祢保守他们脱离那恶者': 'but that Thou shouldest keep them from the evil',
  '他们不属世界': 'they are not of the world',
  '正如我不属世界一样': 'even as I am not of the world',
  '求祢用真理使他们成圣': 'sanctify them through Thy truth',
  '祢的道就是真理': 'Thy word is truth',
  '为这些人祈求': 'I pray for these',
  '也为那些因他们的话信我的人祈求': 'for them also which shall believe on me through their word',
  '叫他们都合而为一': 'that they all may be one',
  '正如祢父在我里面': 'as Thou, Father, art in me',
  '我在祢里面': 'and I in Thee',
  '使他们也在我们里面': 'that they also may be one in us',
  '叫世人可以信祢差了我来': 'that the world may believe that Thou hast sent me',
  '祢所赐给我的荣耀': 'the glory which Thou gavest me',
  '我已赐给他们': 'I have given them',
  '使他们合而为一': 'that they may be one',
  '像我们合而为一': 'even as we are one',
  '我在他们里面': 'I in them',
  '祢在我里面': 'and Thou in me',
  '使他们完完全全地合而为一': 'that they may be made perfect in one',
  '叫世人知道祢差了我来': 'that the world may know that Thou hast sent me',
  '也知道祢爱他们如同爱我一样': 'and hast loved them, as Thou hast loved me',
  '我在哪里': 'where I am',
  '愿祢所赐给我的人': 'them which Thou gavest me',
  '也同我在那里': 'be with me where I am',
  '叫他们看见祢所赐给我的荣耀': 'that they may behold my glory',
  '因为创立世界以前': 'for Thou lovedst me before the foundation of the world',
  '祢已经爱我了': 'Thou lovedst me',
  '公义的父啊': 'O righteous Father',
  '世人未曾认识祢': 'the world hath not known Thee',
  '我却认识祢': 'but I have known Thee',
  '这些人也知道祢差了我来': 'and these have known that Thou hast sent me',
  '我已将祢的名指示他们': 'I have declared unto them Thy name',
  '还要指示他们': 'and will declare it',
  '使祢所爱我的爱在他们里面': 'that the love wherewith Thou hast loved me may be in them',
  '我也在他们里面': 'and I in them',
  '客西马尼园的祷告': 'prayer in Gethsemane',
  '极其伤痛': 'sore amazed',
  '极其难过': 'very heavy',
  '心里甚是忧伤': 'exceeding sorrowful',
  '几乎要死': 'even unto death',
  '倘若可行': 'if it be possible',
  '求祢叫这杯离开我': 'let this cup pass from me',
  '然而': 'nevertheless',
  '不要照我的意思': 'not as I will',
  '只要照祢的意思': 'but as Thou wilt',
  '我父啊': 'O my Father',
  '这杯若不能离开我': 'if this cup may not pass away from me',
  '必要我喝': 'except I drink it',
  '愿祢的旨意成全': 'Thy will be done',
  '同我儆醒片时': 'watch with me one hour',
  '心灵固然愿意': 'the spirit indeed is willing',
  '肉体却软弱了': 'but the flesh is weak',
  '起来': 'rise',
  '让我们走吧': 'let us be going',
  '看哪': 'behold',
  '卖我的人近了': 'he is at hand that doth betray me',
  '十架七言': 'seven words from the cross',
  '父啊赦免他们': 'Father, forgive them',
  '因为他们所作的': 'for they know not',
  '他们不晓得': 'they know not what they do',
  '今日': 'today',
  '你要同我在乐园里了': 'shalt thou be with me in paradise',
  '母亲': 'woman',
  '看你的儿子': 'behold thy son',
  '看你的母亲': 'behold thy mother',
  '为什么离弃我': 'why hast Thou forsaken me',
  '我渴了': 'I thirst',
  '成了': 'it is finished',
  '我将我的灵魂交在祢手里': 'into Thy hands I commend my spirit',
  '主祷文': 'the Lord\'s Prayer',
  '愿人都尊祢的名为圣': 'hallowed be Thy name',
  '愿祢的国降临': 'Thy Kingdom come',
  '愿祢的旨意行在地上': 'Thy will be done on earth',
  '如同行在天上': 'as it is in heaven',
  '我们日用的饮食': 'give us this day our daily bread',
  '今日赐给我们': 'give us this day',
  '免我们的债': 'forgive us our debts',
  '如同我们免了人的债': 'as we forgive our debtors',
  '不叫我们遇见试探': 'lead us not into temptation',
  '救我们脱离凶恶': 'deliver us from evil',
  '因为国度': 'for Thine is the Kingdom',
  '全是祢的': 'Thine',
  '直到永远': 'forever',
  '阿们': 'Amen',
};

/**
 * 简单的翻译函数
 * 将中文输入翻译为英文
 */
function translateToEnglish(input: string): string {
  let translated = input;
  
  // 按长度降序排序，避免短词先被替换
  const sortedKeys = Object.keys(translationMap).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const regex = new RegExp(key, 'gi');
    translated = translated.replace(regex, translationMap[key]);
  }
  
  return translated || input;
}

/**
 * 生成祷告文
 * 根据检测到的主题和用户输入生成完整祷告文
 */
export function generatePrayer(theme: PrayerTheme, userInput: string, language: 'zh' | 'en'): string {
  const template = prayerTemplates[theme];
  const content = template[language];
  
  // 如果是英文祷告，将中文输入翻译为英文
  const replacementText = language === 'en' ? translateToEnglish(userInput) : userInput;
  
  // 替换占位符
  return content.content.replace('{content}', replacementText);
}