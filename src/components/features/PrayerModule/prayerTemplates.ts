export type PrayerTheme = 'thanksgiving' | 'petition' | 'confession' | 'intercession' | 'protection' | 'guidance' | 'worship' | 'healing' | 'repentance' | 'church' | 'nation';

export interface PrayerContent {
  title: string;
  content: string;
  scripture: {
    reference: string;
    text: string;
  };
}

export interface PrayerTemplate {
  zh: PrayerContent;
  en: PrayerContent;
  keywords: {
    zh: string[];
    en: string[];
  };
}

export const prayerTemplates: Record<PrayerTheme, PrayerTemplate> = {
  thanksgiving: {
    zh: {
      title: '感恩祷告',
      content: `我们在天上的父，感谢赞美祢的圣名。

祢是创造天地万物的主，是赐下一切美善恩赐的神。今天，我怀着感恩的心来到祢面前，为着{content}向祢献上感谢。

主啊，祢的恩典每天早晨都是新的，祢的信实极其广大。在我还不认识祢的时候，祢就已经爱了我；在我还软弱的时候，祢就扶持了我。祢以恩典为年岁的冠冕，祢的路径都滴下脂油。

我要称谢耶和华，因祂本为善，祂的慈爱永远长存。愿一切尊贵、荣耀都归给坐宝座的和羔羊，直到永永远远。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '诗篇 107:1',
        text: '你们要称谢耶和华，因祂本为善，祂的慈爱永远长存。'
      }
    },
    en: {
      title: 'Prayer of Thanksgiving',
      content: `Our Father who art in heaven, hallowed be Thy name.

Thou art the Creator of heaven and earth, the Giver of every good and perfect gift. Today I come before Thy presence with thanksgiving, offering gratitude for {content}.

O Lord, Thy mercies are new every morning, and Thy faithfulness is great. When I knew Thee not, Thou didst love me; when I was weak, Thou didst uphold me. Thou crownest the year with Thy goodness, and Thy paths drop fatness.

I will give thanks unto the Lord, for He is good; His mercy endureth forever. Unto Him that sitteth upon the throne, and unto the Lamb, be blessing and honor and glory and power, for ever and ever.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Psalm 107:1',
        text: 'O give thanks unto the Lord, for He is good; His mercy endureth forever.'
      }
    },
    keywords: {
      zh: ['感谢', '感恩', '谢谢', '祝福'],
      en: ['thank', 'grateful', 'blessing', 'grace']
    }
  },
  petition: {
    zh: {
      title: '祈求祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

慈爱的天父，我来到祢的施恩宝座前，为着{content}向祢祈求。祢曾应许说："你们祈求，就给你们；寻找，就寻见；叩门，就给你们开门。"

主啊，祢知道我的需要，祢明白我的软弱。我不求照我的意思，乃求照祢的意思成全。因为祢的意念高过我的意念，祢的道路高过我的道路。祢是使无变为有的神，在祢没有难成的事。

求祢按着祢丰盛的荣耀，藉着祢的灵，叫我心里的力量刚强起来。愿祢的旨意行在地上，如同行在天上。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '马太福音 7:7',
        text: '你们祈求，就给你们；寻找，就寻见；叩门，就给你们开门。'
      }
    },
    en: {
      title: 'Prayer of Petition',
      content: `Our Father who art in heaven, hallowed be Thy name.

Gracious Father, I come boldly unto the throne of grace concerning {content}. Thou hast promised: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you."

O Lord, Thou knowest my needs, Thou understandest my weakness. Not my will, but Thine be done. For Thy thoughts are higher than my thoughts, and Thy ways than my ways. Thou art the God who calleth those things which be not as though they were; with Thee nothing is impossible.

Grant me, according to the riches of Thy glory, to be strengthened with might by Thy Spirit in the inner man. Thy kingdom come, Thy will be done on earth as it is in heaven.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Matthew 7:7',
        text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.'
      }
    },
    keywords: {
      zh: ['求', '需要', '帮助'],
      en: ['ask', 'need', 'help', 'want']
    }
  },
  confession: {
    zh: {
      title: '认罪祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

圣洁公义的神啊，我来到祢面前，承认{content}。祢是鉴察人心肺腑的，在祢面前没有隐藏的事。我知道我的过犯，我的罪常在我面前。

主啊，祢若究察罪孽，谁能站得住呢？但在祢有赦免之恩，要叫人敬畏祢。祢是信实的，是公义的，必要赦免我们的罪，洗净我们一切的不义。

求祢用主耶稣的宝血遮盖我，使我比雪更白。求祢的灵光照我，引导我走永生的道路。从今以后，我要离弃罪恶，跟随祢的脚踪行。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '约翰一书 1:9',
        text: '我们若认自己的罪，神是信实的，是公义的，必要赦免我们的罪，洗净我们一切的不义。'
      }
    },
    en: {
      title: 'Prayer of Confession',
      content: `Our Father who art in heaven, hallowed be Thy name.

Holy and righteous God, I come before Thee confessing {content}. Thou art the searcher of hearts; there is nothing hidden from Thy sight. I acknowledge my transgressions, and my sin is ever before me.

O Lord, if Thou shouldest mark iniquities, who shall stand? But there is forgiveness with Thee, that Thou mayest be feared. Thou art faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.

Cover me with the precious blood of Jesus, and make me whiter than snow. Let Thy Spirit enlighten me, and lead me in the way everlasting. From this day forward, I will forsake sin and follow in Thy steps.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: '1 John 1:9',
        text: 'If we confess our sins, He is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.'
      }
    },
    keywords: {
      zh: ['罪', '过错', '悔改', '赦免'],
      en: ['sin', 'wrong', 'repent', 'forgive']
    }
  },
  intercession: {
    zh: {
      title: '代求祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

满有怜悯的父神，我来到祢面前，为着{content}向祢祈求。祢曾教导我们要彼此代求，因为义人祈祷所发的力量是大有功效的。

主啊，祢是赐各样安慰的神，祢曾在一切苦难中安慰我们。求祢记念他们的需要，看顾他们的软弱，医治他们的疾病，坚固他们的信心。愿祢的平安，就是出人意外的平安，保守他们的心怀意念。

求祢使他们在一切患难中，经历祢的同在和能力。愿祢的荣耀彰显在他们的生命中，使许多人因此认识祢的名。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '雅各书 5:16',
        text: '义人祈祷所发的力量是大有功效的。'
      }
    },
    en: {
      title: 'Prayer of Intercession',
      content: `Our Father who art in heaven, hallowed be Thy name.

Father of mercies, I come before Thee interceding for {content}. Thou hast taught us to pray for one another, for the effectual fervent prayer of a righteous man availeth much.

O Lord, Thou art the God of all comfort, who comforteth us in all our tribulation. Remember their needs, behold their weakness, heal their sicknesses, and establish their faith. Let Thy peace, which passeth all understanding, keep their hearts and minds.

Grant that in all their afflictions they may experience Thy presence and power. Let Thy glory be manifested in their lives, that many may know Thy name.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'James 5:16',
        text: 'The effectual fervent prayer of a righteous man availeth much.'
      }
    },
    keywords: {
      zh: ['为', '家人', '朋友', '病人'],
      en: ['for', 'family', 'friend', 'sick']
    }
  },
  protection: {
    zh: {
      title: '守护祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

全能的神啊，祢是我的避难所，是我的山寨，是我的神，是我所倚靠的。今天，我为着{content}来到祢面前，求祢的保护和看顾。

主啊，祢是住在我们里面的，比那在世界上的更大。祢曾应许要吩咐祢的使者，在我们行的一切道路上保护我们。白日，太阳必不伤我；夜间，月亮也不害我。祢要救我脱离捕鸟人的网罗和毒害的瘟疫。

求祢用祢的翎毛遮蔽我，叫我住在祢翅膀的荫下。祢是我的盾牌，是我的荣耀，又是叫我抬起头来的。虽有千人仆倒在我旁边，万人仆倒在我右边，这灾却不得临近我。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '诗篇 91:1-2',
        text: '住在至高者隐密处的，必住在全能者的荫下。我要论到耶和华说：祂是我的避难所，是我的山寨，是我的神，是我所倚靠的。'
      }
    },
    en: {
      title: 'Prayer for Protection',
      content: `Our Father who art in heaven, hallowed be Thy name.

Almighty God, Thou art my refuge and my fortress, my God, in whom I trust. Today I come before Thee concerning {content}, seeking Thy protection and care.

O Lord, greater is He that is in me than he that is in the world. Thou hast promised to give Thy angels charge over me, to keep me in all my ways. The sun shall not smite me by day, nor the moon by night. Thou shalt deliver me from the snare of the fowler and from the noisome pestilence.

Hide me under the shadow of Thy wings. Thou art my shield and my glory, and the lifter up of mine head. Though a thousand fall at my side, and ten thousand at my right hand, it shall not come nigh me.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Psalm 91:1-2',
        text: 'He that dwelleth in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress; my God, in Him will I trust.'
      }
    },
    keywords: {
      zh: ['害怕', '担心', '保护', '平安'],
      en: ['fear', 'protect', 'peace', 'safety']
    }
  },
  guidance: {
    zh: {
      title: '引导祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

永恒智慧的神啊，祢是道路、真理、生命，若不藉着祢，没有人能到父那里去。今天，我在{content}上寻求祢的引导和指示。

主啊，祢的话是我脚前的灯，是我路上的光。求祢使我不偏左右，使我走正路。祢的意念高过我的意念，祢的道路高过我的道路。求祢除去我心中的骄傲和固执，使我能顺服祢的带领。

求祢赐我智慧和启示的灵，使我真知道祢。愿祢的圣灵引导我明白一切的真理，教导我当行的路。我要专心仰赖耶和华，不倚靠自己的聪明，在我一切所行的事上都要认定祢，祢必指引我的路。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '箴言 3:5-6',
        text: '你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定祂，祂必指引你的路。'
      }
    },
    en: {
      title: 'Prayer for Guidance',
      content: `Our Father who art in heaven, hallowed be Thy name.

God of eternal wisdom, Thou art the Way, the Truth, and the Life; no man cometh unto the Father but by Thee. Today I seek Thy guidance and direction concerning {content}.

O Lord, Thy word is a lamp unto my feet and a light unto my path. Cause me not to turn to the right hand or to the left, that I may walk in the way of understanding. Thy thoughts are higher than my thoughts, and Thy ways than my ways. Remove from me pride and stubbornness, that I may submit to Thy leading.

Grant me the spirit of wisdom and revelation in the knowledge of Thee. Let Thy Holy Spirit guide me into all truth, and teach me the way I should go. I will trust in the Lord with all my heart, and lean not unto my own understanding. In all my ways I will acknowledge Him, and He shall direct my paths.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Proverbs 3:5-6',
        text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge Him, and He shall direct thy paths.'
      }
    },
    keywords: {
      zh: ['迷茫', '选择', '方向', '智慧'],
      en: ['confused', 'guide', 'wisdom', 'direction']
    }
  },
  worship: {
    zh: {
      title: '敬拜赞美祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

圣洁、尊荣、全能的神啊，今天我要为着{content}向祢献上敬拜和赞美。祢是创造天地万物的主，是自有永有的神。祢坐在宝座上，统治万有，祢的权柄存到永远。

主啊，祢本为大，该受大赞美。祢的作为奇妙，祢的意念高深。诸天述说祢的荣耀，穹苍传扬祢的手段。我要称谢祢，因我受造奇妙可畏；祢的作为奇妙，这是我心深知道的。

祢是配得权柄、丰富、智慧、能力、尊贵、荣耀、颂赞的。曾被杀的羔羊是配得权柄、丰富、智慧、能力、尊贵、荣耀、颂赞的。愿颂赞、尊贵、荣耀、权势都归给坐宝座的和羔羊，直到永永远远。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '诗篇 96:4',
        text: '因耶和华为大，当受极大的赞美；祂在万神之上，当受敬畏。'
      }
    },
    en: {
      title: 'Prayer of Worship and Praise',
      content: `Our Father who art in heaven, hallowed be Thy name.

Holy, glorious, and Almighty God, today I come to offer Thee worship and praise for {content}. Thou art the Creator of heaven and earth, the self-existent and eternal God. Thou sittest upon the throne, ruling over all things; Thy dominion endureth throughout all generations.

O Lord, Thou art great, and greatly to be praised. Thy works are marvelous, Thy thoughts are profound. The heavens declare Thy glory, and the firmament showeth Thy handiwork. I will praise Thee, for I am fearfully and wonderfully made; marvelous are Thy works, and that my soul knoweth right well.

Thou art worthy to receive power, and riches, and wisdom, and strength, and honor, and glory, and blessing. The Lamb that was slain is worthy to receive power, and riches, and wisdom, and strength, and honor, and glory, and blessing. Blessing, and honor, and glory, and power be unto Him that sitteth upon the throne, and unto the Lamb, for ever and ever.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Psalm 96:4',
        text: 'For the Lord is great, and greatly to be praised: He is to be feared above all gods.'
      }
    },
    keywords: {
      zh: ['敬拜', '赞美', '歌颂', '尊崇', '荣耀神', '称颂'],
      en: ['worship', 'praise', 'adore', 'glorify', 'exalt', 'magnify']
    }
  },
  healing: {
    zh: {
      title: '医治祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

耶和华拉法，祢是医治我们的神。今天，我为着{content}来到祢面前，求祢伸出医治的手，触摸这患病的身体/心灵。

主啊，祢曾应许说：「祂代替我们的软弱，担当我们的疾病。」因祢受的鞭伤，我们便得了医治。祢是信实的，祢的话语必不落空。求祢的医治之能运行在这身体上，驱除一切疾病和疼痛。

求祢的圣灵充满这患病的部位，让祢的生命、祢的健康、祢的活力流淌在每一个细胞里。求祢除去一切疾病的根源，无论是身体的、心灵的还是灵性的。愿祢的平安临到，愿祢的喜乐充满。

我相信祢是医治的神，祢的应许永不改变。奉主耶稣的名，宣告这身体要得医治，要恢复健康，要重新得力。感谢祢的恩典和怜悯。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '出埃及记 15:26',
        text: '因为我耶和华是医治你的。'
      }
    },
    en: {
      title: 'Prayer for Healing',
      content: `Our Father who art in heaven, hallowed be Thy name.

Jehovah-Rapha, Thou art the God who healeth us. Today I come before Thee concerning {content}, asking Thee to stretch forth Thy healing hand and touch this sick body/soul.

O Lord, Thou hast promised: "He hath borne our griefs, and carried our sorrows." By His stripes we are healed. Thou art faithful, and Thy word shall not return void. Let Thy healing power flow through this body, driving out all sickness and pain.

Fill this afflicted part with Thy Holy Spirit; let Thy life, Thy health, and Thy vitality flow through every cell. Remove all root causes of disease, whether physical, emotional, or spiritual. Let Thy peace come, and let Thy joy fill.

I believe Thou art the God who healeth, and Thy promises never change. In Jesus' name, I declare that this body shall be healed, shall be restored to health, and shall be renewed in strength. I thank Thee for Thy grace and mercy.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Exodus 15:26',
        text: 'For I am the Lord that healeth thee.'
      }
    },
    keywords: {
      zh: ['医治', '疾病', '病痛', '健康', '痊愈', '康复', '生病', '疼痛'],
      en: ['heal', 'healing', 'sick', 'sickness', 'disease', 'illness', 'pain', 'health']
    }
  },
  repentance: {
    zh: {
      title: '悔改祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

圣洁公义的神啊，我俯伏在祢面前，为着{content}深深悔改。祢是鉴察人心的神，在祢面前没有隐藏的事。

主啊，我得罪了祢，得罪了天。我的罪孽高过我的头，如同重担叫我担当不起。我厌恶自己的过犯，我为自己的罪忧伤痛悔。祢不喜悦恶人死亡，惟喜悦恶人转离所行的道而存活。

求祢用主耶稣的宝血洁净我，洗除我一切的罪污。求祢的灵光照我，使我看清自己深处的黑暗。我愿意离弃罪恶，转离恶道，专心跟从祢。

求祢赐我一颗悔改的心，一颗痛悔的灵。使我不再重蹈覆辙，不再走回头路。我要完全顺服祢的旨意，行在祢的道路上。求祢接纳我这个悔改的罪人，用祢的恩典覆庇我。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '诗篇 51:17',
        text: '神所要的祭就是忧伤的灵；神啊，忧伤痛悔的心，祢必不轻看。'
      }
    },
    en: {
      title: 'Prayer of Repentance',
      content: `Our Father who art in heaven, hallowed be Thy name.

Holy and righteous God, I prostrate myself before Thee, deeply repenting of {content}. Thou art the God who searcheth the heart; there is nothing hidden from Thy sight.

O Lord, I have sinned against Thee, against heaven. Mine iniquities are gone over mine head; as an heavy burden they are too heavy for me. I abhor my transgressions; I am sorry for my sins with a godly sorrow. Thou delightest not in the death of the wicked, but that the wicked turn from his way and live.

Cleanse me with the precious blood of Jesus; wash away all my filthiness. Let Thy Spirit enlighten me, that I may see the darkness deep within. I am willing to forsake sin, to turn from the evil way, and to follow Thee wholeheartedly.

Grant me a heart of repentance, a contrite spirit. Let me not return to my folly, not walk in the old paths. I will fully submit to Thy will and walk in Thy ways. Receive me, a repentant sinner, and cover me with Thy grace.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Psalm 51:17',
        text: 'The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, Thou wilt not despise.'
      }
    },
    keywords: {
      zh: ['悔改', '回转', '离弃罪恶', '转离恶道', '痛悔', '忧伤', '厌恶罪恶'],
      en: ['repent', 'repentance', 'turn', 'forsake sin', 'contrite', 'broken', 'godly sorrow']
    }
  },
  church: {
    zh: {
      title: '为教会祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

为着祢的教会，为着{content}，我今天来到祢面前。主啊，教会是祢的身体，是祢用重价买来的。求祢记念祢的教会，复兴祢的教会，建造祢的教会。

求祢使祢的教会合而为一，正如祢与父合而为一。除去一切的分争、嫉妒、结党，让爱心在教会中流淌。求祢兴起忠心的仆人，按著正意分解真理的道，喂养祢的羊群。

求祢的圣灵大大浇灌祢的教会，带来真正的复兴。让每一个信徒都被圣灵充满，活出圣洁的生活，成为世上的光、世上的盐。求祢使教会成为祷告的殿，成为万民祷告的地方。

求祢保护祢的教会脱离凶恶，抵挡一切异端邪说和世界的诱惑。使教会在逼迫中站立得稳，在试炼中更加刚强。愿祢的荣耀充满祢的教会，吸引万人来归向祢。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '马太福音 16:18',
        text: '我要把我的教会建造在这磐石上；阴间的权柄不能胜过他。'
      }
    },
    en: {
      title: 'Prayer for the Church',
      content: `Our Father who art in heaven, hallowed be Thy name.

For Thy church, for {content}, I come before Thee today. O Lord, the church is Thy body, which Thou hast purchased with Thy own blood. Remember Thy church, revive Thy church, build Thy church.

Grant that Thy church may be one, even as Thou and the Father are one. Remove all strife, envy, and divisions; let love flow in the church. Raise up faithful servants who rightly divide the word of truth, feeding Thy flock.

Pour out Thy Holy Spirit mightily upon Thy church, bringing true revival. Let every believer be filled with the Spirit, living a holy life, becoming the light of the world and the salt of the earth. Make Thy church a house of prayer for all nations.

Protect Thy church from evil; resist all heresies and the temptations of the world. Cause Thy church to stand firm in persecution, and to be strengthened through trials. Let Thy glory fill Thy church, drawing all men unto Thee.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: 'Matthew 16:18',
        text: 'Upon this rock I will build my church; and the gates of hell shall not prevail against it.'
      }
    },
    keywords: {
      zh: ['教会', '牧师', '弟兄姐妹', '信徒', '复兴', '聚会', '礼拜', '团契', '同工'],
      en: ['church', 'pastor', 'brethren', 'believers', 'revival', 'fellowship', 'congregation', 'ministry']
    }
  },
  nation: {
    zh: {
      title: '为国家民族祷告',
      content: `我们在天上的父，愿人都尊祢的名为圣。

万王之王、万主之主啊，今天我为着{content}来到祢面前。祢是掌管历史的神，是设立君王、废黜君王的主。愿祢的旨意行在这地上，如同行在天上。

求祢怜悯这个国家、这个民族。求祢赦免我们的罪，医治这地。求祢兴起合祢心意的领袖，秉公行义，牧养百姓。求祢使国泰民安，使百姓安居乐业。

求祢的福音在这地广传，使万民认识祢这位独一的真神。求祢的教会在这地兴旺，成为世上的光，照亮黑暗。求祢的平安临到这地，止息一切的战争、灾难、瘟疫。

求祢记念这片土地上的百姓，特别是那些贫穷的、软弱的、受压迫的。求祢伸张公义，为受屈的伸冤。愿祢的慈爱覆盖这地，愿祢的救恩临到万民。

主啊，愿祢的国降临，愿祢的旨意行在这地上。愿人都尊祢的名为圣。愿祢的名在全地被尊崇，愿祢的荣耀充满全地。

奉主耶稣的名祷告，阿们。`,
      scripture: {
        reference: '提摩太前书 2:1-2',
        text: '我劝你，第一要为万人恳求、祷告、代求、祝谢；为君王和一切在位的，也该如此，使我们可以敬虔、端正、平安无事地度日。'
      }
    },
    en: {
      title: 'Prayer for Nation and People',
      content: `Our Father who art in heaven, hallowed be Thy name.

King of kings, and Lord of lords, today I come before Thee concerning {content}. Thou art the God who rulest over history, who setteth up kings and deposed kings. Thy will be done on earth as it is in heaven.

Have mercy upon this nation, this people. Forgive our sins, and heal our land. Raise up leaders after Thine own heart, who will execute justice and righteousness, and shepherd the people. Grant peace and prosperity to the land, that the people may dwell in safety.

Let Thy gospel spread throughout this land, that all nations may know Thee, the only true God. Cause Thy church to flourish in this place, becoming the light of the world, illuminating the darkness. Let Thy peace come upon this land, ceasing all wars, disasters, and plagues.

Remember the people of this land, especially the poor, the weak, and the oppressed. Execute justice, and plead the cause of the afflicted. Let Thy mercy cover this land; let Thy salvation come unto all people.

O Lord, Thy Kingdom come, Thy will be done on this earth. Hallowed be Thy name. Let Thy name be exalted in all the earth; let Thy glory fill the whole earth.

In Jesus' name I pray, Amen.`,
      scripture: {
        reference: '1 Timothy 2:1-2',
        text: 'I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men; for kings, and for all that are in authority; that we may lead a quiet and peaceable life in all godliness and honesty.'
      }
    },
    keywords: {
      zh: ['国家', '民族', '政府', '领袖', '总统', '人民', '百姓', '社会', '国泰民安', '世界和平'],
      en: ['nation', 'country', 'government', 'leader', 'president', 'people', 'society', 'peace', 'world']
    }
  }
};