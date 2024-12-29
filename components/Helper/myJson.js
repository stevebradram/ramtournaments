import React, { Component } from 'react'

var theFightsJson=[
    {
        "id": "AlexandreKai",
        "time": "Sun, Dec 8 / 5:00 AM SAST",
        "matchMillis": 1733518800000,
        "fighter1Name": "Alexandre Pantoja",
        "fighter1Link": "https://www.ufc.com/athlete/alexandre-pantoja",
        "fighter2Link": "https://www.ufc.com/athlete/kai-asakura",
        "p1Rec": "",
        "p1Points": "",
        "fighter1Country": "Brazil",
        "fighter2Country": "Japan",
        "fighter2Name": "Kai Asakura",
        "p2Rec": "",
        "p2Points": "",
        "game": "UFC",
        "type": "mainCard",
        "p1Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/PANTOJA_ALEXANDRE_L_BELT_05-04.png?itok=YEFsnARi",
        "p2Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-11/ASAKURA_KAI_R.png?itok=360bFpfr",
        "status1": "notPlayed",
        "winner": "",
        "match": "Flyweight Title Bout"
    },
    {
        "id": "ShavkatIan",
        "time": "Sun, Dec 8 / 5:00 AM SAST",
        "matchMillis": 1733518800000,
        "fighter1Name": "Shavkat Rakhmonov",
        "fighter1Link": "https://www.ufc.com/athlete/shavkat-rakhmonov",
        "fighter2Link": "https://www.ufc.com/athlete/nassurdin-imavov-4",
        "p1Rec": "",
        "p1Points": "",
        "fighter1Country": "Kazakhstan",
        "fighter2Country": "Ireland",
        "fighter2Name": "Ian Machado Garry",
        "p2Rec": "",
        "p2Points": "",
        "game": "UFC",
        "type": "mainCard",
        "p1Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/RAKHMONOV_SHAVKAT_L_12-16.png?itok=QMf2-yZz",
        "p2Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/GARRY_IAN_R_06-29.png?itok=IXJjyIJQ",
        "status1": "notPlayed",
        "winner": "",
        "match": "Welterweight Bout"
    },
    {
        "id": "CirylAlexander",
        "time": "Sun, Dec 8 / 5:00 AM SAST",
        "matchMillis": 1733518800000,
        "fighter1Name": "Ciryl Gane",
        "fighter1Link": "https://www.ufc.com/athlete/ciryl-gane",
        "fighter2Link": "https://www.ufc.com/athlete/alexander-volkov",
        "p1Rec": "",
        "p1Points": "",
        "fighter1Country": "France",
        "fighter2Country": "Russia",
        "fighter2Name": "Alexander Volkov",
        "p2Rec": "",
        "p2Points": "",
        "game": "UFC",
        "type": "mainCard",
        "p1Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/GANE_CIRYL_L_09-02.png?itok=iVD78Ig2",
        "p2Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/VOLKOV_ALEXANDER_R_06-22.png?itok=V6i5ZNMw",
        "status1": "notPlayed",
        "winner": "",
        "match": "Heavyweight Bout"
    },
    {
        "id": "BryceKron",
        "time": "Sun, Dec 8 / 5:00 AM SAST",
        "matchMillis": 1733518800000,
        "fighter1Name": "Bryce Mitchell",
        "fighter1Link": "https://www.ufc.com/athlete/bryce-mitchell",
        "fighter2Link": "https://www.ufc.com/athlete/kron-gracie",
        "p1Rec": "",
        "p1Points": "",
        "fighter1Country": "United States",
        "fighter2Country": "",
        "fighter2Name": "Kron Gracie",
        "p2Rec": "",
        "p2Points": "",
        "game": "UFC",
        "type": "mainCard",
        "p1Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-10/2/MITCHELL_BRYCE_L_09-23.png?itok=35IuVN-F",
        "p2Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-06/GRACIE_KRON_R_05-06.png?itok=u5GWw_uE",
        "status1": "notPlayed",
        "winner": "",
        "match": "Featherweight Bout"
    },
    {
        "id": "NateDooho",
        "time": "Sun, Dec 8 / 5:00 AM SAST",
        "matchMillis": 1733518800000,
        "fighter1Name": "Nate Landwehr",
        "fighter1Link": "https://www.ufc.com/athlete/nate-landwehr",
        "fighter2Link": "https://www.ufc.com/athlete/dooho-choi",
        "p1Rec": "",
        "p1Points": "",
        "fighter1Country": "United States",
        "fighter2Country": "South Korea",
        "fighter2Name": "Dooho Choi",
        "p2Rec": "",
        "p2Points": "",
        "game": "UFC",
        "type": "mainCard",
        "p1Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-03/LANDWEHR_NATE_L_03-30.png?itok=Idwzb-CP",
        "p2Photo": "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-02/CHOI_DOOHO_R_02-04.png?itok=TILaacWs",
        "status1": "notPlayed",
        "winner": "",
        "match": "Featherweight Bout"
    }
]
var theOdds2Json = []
var theOddsJson = [
    {
        "id": "1ebcabd281524267f4acdbeba81abbf4",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T18:00:00Z",
        "home_team": "Brent Primus",
        "away_team": "Gadzhi Rabadanov",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brent Primus",
                                "price": 400
                            },
                            {
                                "name": "Gadzhi Rabadanov",
                                "price": -550
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brent Primus",
                                "price": 370
                            },
                            {
                                "name": "Gadzhi Rabadanov",
                                "price": -600
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brent Primus",
                                "price": 400
                            },
                            {
                                "name": "Gadzhi Rabadanov",
                                "price": -550
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "82844f1b1439a3f652a85b9d7ea11d9d",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T18:00:00Z",
        "home_team": "Dakota Ditcheva",
        "away_team": "Taila Santos",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dakota Ditcheva",
                                "price": -400
                            },
                            {
                                "name": "Taila Santos",
                                "price": 300
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dakota Ditcheva",
                                "price": -360
                            },
                            {
                                "name": "Taila Santos",
                                "price": 260
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dakota Ditcheva",
                                "price": -375
                            },
                            {
                                "name": "Taila Santos",
                                "price": 280
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "2b26d7b82f37896c4ae1f808cdce13cf",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T18:00:00Z",
        "home_team": "Denis Goltsov",
        "away_team": "Oleg Popov",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Denis Goltsov",
                                "price": -118
                            },
                            {
                                "name": "Oleg Popov",
                                "price": -108
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Denis Goltsov",
                                "price": -105
                            },
                            {
                                "name": "Oleg Popov",
                                "price": -115
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "25614aca55f3dcd3af5179c3625b71cc",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T18:00:00Z",
        "home_team": "Impa Kasanganay",
        "away_team": "Dovletdzhan Yagshimuradov",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dovletdzhan Yagshimuradov",
                                "price": 120
                            },
                            {
                                "name": "Impa Kasanganay",
                                "price": -145
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dovletdzhan Yagshimuradov",
                                "price": 108
                            },
                            {
                                "name": "Impa Kasanganay",
                                "price": -136
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dovletdzhan Yagshimuradov",
                                "price": 110
                            },
                            {
                                "name": "Impa Kasanganay",
                                "price": -135
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "45aade1e2c74f82dac6f8ae9a7cbcc03",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T18:00:00Z",
        "home_team": "Magomed Umalatov",
        "away_team": "Shamil Musaev",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Magomed Umalatov",
                                "price": 185
                            },
                            {
                                "name": "Shamil Musaev",
                                "price": -225
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Magomed Umalatov",
                                "price": 160
                            },
                            {
                                "name": "Shamil Musaev",
                                "price": -210
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Magomed Umalatov",
                                "price": 185
                            },
                            {
                                "name": "Shamil Musaev",
                                "price": -225
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "4ff946313315ef0abf86afe8d4e57d9a",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-29T19:00:00Z",
        "home_team": "Brendan Loughnane",
        "away_team": "Timur Khizriev",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brendan Loughnane",
                                "price": 250
                            },
                            {
                                "name": "Timur Khizriev",
                                "price": -310
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brendan Loughnane",
                                "price": 230
                            },
                            {
                                "name": "Timur Khizriev",
                                "price": -320
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Brendan Loughnane",
                                "price": 240
                            },
                            {
                                "name": "Timur Khizriev",
                                "price": -300
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "d51dd3e29fe8b526bae8251d32e08f89",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Abdurakhman Nasrutdinov",
        "away_team": "Fadi Farag",
        "bookmakers": []
    },
    {
        "id": "e8e4ddb7df52e1c4f4a0590cce9451b6",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Baysangur Makaev",
        "away_team": "Alessandro Capone",
        "bookmakers": []
    },
    {
        "id": "b0f15c2b470e87acbec29865e8466e57",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Arlind Berisha",
        "away_team": "Ian Kuchler",
        "bookmakers": []
    },
    {
        "id": "2440b4147b80f9337f097428849ec66c",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Rohullah Yousofi",
        "away_team": "Dawid Romański",
        "bookmakers": []
    },
    {
        "id": "72c0cc5e647f4119ec591f3f27404caa",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Saba Sozashvili",
        "away_team": "Djaba Murtazaliev",
        "bookmakers": []
    },
    {
        "id": "92cb8c79bde61734f6a66756599c9365",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "John Oldenqvist",
        "away_team": "Mihail Lavraniuc",
        "bookmakers": []
    },
    {
        "id": "f673bd3e5a56085a1d1f7cab0178fe24",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Kevin Mickelsson",
        "away_team": "Kevin Dolvik",
        "bookmakers": []
    },
    {
        "id": "2b931f549727925567718cc126b77bf7",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-11-30T15:00:00Z",
        "home_team": "Tanio Pagliariccio",
        "away_team": "Zoran Milic",
        "bookmakers": []
    },
    {
        "id": "1894ecd5aae415978a0b57beac08b1ef",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T18:00:00Z",
        "home_team": "Tarik Khbabez",
        "away_team": "Donegi Abena",
        "bookmakers": []
    },
    {
        "id": "42a2173f333797b6382853ec508277a9",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T18:00:00Z",
        "home_team": "Rico Verhoeven",
        "away_team": "Levi Rigters",
        "bookmakers": []
    },
    {
        "id": "23a623f0fdd7af3eaf250fed1dd36337",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Anthony Smith",
        "away_team": "Dominick Reyes",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 270
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -330
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 275
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -345
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 275
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -350
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 270
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -360
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 255
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -350
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Anthony Smith",
                                "price": 270
                            },
                            {
                                "name": "Dominick Reyes",
                                "price": -350
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "cb0f5b4bd4fe66e6440255f03916822d",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Randy Brown",
        "away_team": "Bryan Battle",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -210
                            },
                            {
                                "name": "Randy Brown",
                                "price": 180
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -225
                            },
                            {
                                "name": "Randy Brown",
                                "price": 185
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -225
                            },
                            {
                                "name": "Randy Brown",
                                "price": 185
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -265
                            },
                            {
                                "name": "Randy Brown",
                                "price": 205
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -260
                            },
                            {
                                "name": "Randy Brown",
                                "price": 196
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Bryan Battle",
                                "price": -225
                            },
                            {
                                "name": "Randy Brown",
                                "price": 185
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "7a7510c15e64a63309b37e307da78b8b",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Cody Durden",
        "away_team": "Joshua Van",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Cody Durden",
                                "price": 140
                            },
                            {
                                "name": "Joshua Van",
                                "price": -165
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Cody Durden",
                                "price": 130
                            },
                            {
                                "name": "Joshua Van",
                                "price": -150
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Cody Durden",
                                "price": 136
                            },
                            {
                                "name": "Joshua Van",
                                "price": -162
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Cody Durden",
                                "price": 132
                            },
                            {
                                "name": "Joshua Van",
                                "price": -170
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Cody Durden",
                                "price": 140
                            },
                            {
                                "name": "Joshua Van",
                                "price": -165
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "fba89571d37e3b5bf4ecc3b517ab119f",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Nate Landwehr",
        "away_team": "Dooho Choi",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dooho Choi",
                                "price": 125
                            },
                            {
                                "name": "Nate Landwehr",
                                "price": -145
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dooho Choi",
                                "price": 122
                            },
                            {
                                "name": "Nate Landwehr",
                                "price": -142
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Dooho Choi",
                                "price": 130
                            },
                            {
                                "name": "Nate Landwehr",
                                "price": -155
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dooho Choi",
                                "price": 132
                            },
                            {
                                "name": "Nate Landwehr",
                                "price": -165
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "2da55dcc8ebd0200f5b221aa96a6c576",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Ian Garry",
        "away_team": "Shavkat Rakhmonov",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 285
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -350
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 280
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -390
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 285
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -360
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 275
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -375
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 290
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -375
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Ian Garry",
                                "price": 290
                            },
                            {
                                "name": "Shavkat Rakhmonov",
                                "price": -380
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "8b7c210c1d3211043d06760a8684aef4",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Michael Chiesa",
        "away_team": "Max Griffin",
        "bookmakers": [
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -142
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 122
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -140
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 120
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -142
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 120
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -159
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 128
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -146
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 114
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Max Griffin",
                                "price": -145
                            },
                            {
                                "name": "Michael Chiesa",
                                "price": 120
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "660749523529a1845a42700dd9cb391f",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T20:00:00Z",
        "home_team": "Themba Gorimbo",
        "away_team": "Vicente Luque",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -190
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 165
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -195
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 165
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -198
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 164
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -205
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 163
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -220
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 168
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Themba Gorimbo",
                                "price": -200
                            },
                            {
                                "name": "Vicente Luque",
                                "price": 165
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "26a0d708c7b9ccd5d150e4631164ae26",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T23:00:00Z",
        "home_team": "Movsar Evloev",
        "away_team": "Aljamain Sterling",
        "bookmakers": [
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 205
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -265
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 210
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -250
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 200
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -245
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 210
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -280
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 200
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -250
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Aljamain Sterling",
                                "price": 215
                            },
                            {
                                "name": "Movsar Evloev",
                                "price": -260
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "ca0a4fb39e92bc6b337be912d081b845",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-07T23:00:00Z",
        "home_team": "Clay Guida",
        "away_team": "Chase Hooper",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -800
                            },
                            {
                                "name": "Clay Guida",
                                "price": 500
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -770
                            },
                            {
                                "name": "Clay Guida",
                                "price": 525
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -800
                            },
                            {
                                "name": "Clay Guida",
                                "price": 525
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -850
                            },
                            {
                                "name": "Clay Guida",
                                "price": 500
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -750
                            },
                            {
                                "name": "Clay Guida",
                                "price": 525
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Chase Hooper",
                                "price": -750
                            },
                            {
                                "name": "Clay Guida",
                                "price": 525
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "973c2d493f279677b31db2f8e741819c",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T00:00:00Z",
        "home_team": "Lukasz Brzeski",
        "away_team": "Tallison Teixeira",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Lukasz Brzeski",
                                "price": 280
                            },
                            {
                                "name": "Tallison Teixeira",
                                "price": -390
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f8fbd273b0cfe42363e8ac291d464e04",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T01:00:00Z",
        "home_team": "Chris Weidman",
        "away_team": "Eryk Anders",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Chris Weidman",
                                "price": 100
                            },
                            {
                                "name": "Eryk Anders",
                                "price": -120
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "a20859d863ea963a96ffc02430830e63",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T01:00:00Z",
        "home_team": "Kennedy Nzechukwu",
        "away_team": "Lukasz Brzeski",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Kennedy Nzechukwu",
                                "price": -440
                            },
                            {
                                "name": "Lukasz Brzeski",
                                "price": 340
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "a0faee899b6be520ad379cc9ceb8a1e9",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T03:00:00Z",
        "home_team": "Ciryl Gane",
        "away_team": "Alexander Volkov",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 215
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -255
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 205
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -265
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 200
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -265
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 210
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -258
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 210
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -275
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexander Volkov",
                                "price": 215
                            },
                            {
                                "name": "Ciryl Gane",
                                "price": -260
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "942acdb2b551aa2e8176959f98c55ee1",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T03:00:00Z",
        "home_team": "Bryce Mitchell",
        "away_team": "Kron Gracie",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Bryce Mitchell",
                                "price": -520
                            },
                            {
                                "name": "Kron Gracie",
                                "price": 390
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "3b6e9528ebcb589735157515a54559d4",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-08T04:00:00Z",
        "home_team": "Alexandre Pantoja",
        "away_team": "Kai Asakura",
        "bookmakers": [
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -235
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 185
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -260
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 220
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -245
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 186
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -265
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 215
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -250
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 200
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Alexandre Pantoja",
                                "price": -240
                            },
                            {
                                "name": "Kai Asakura",
                                "price": 200
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "986e45569ae1fa8289e6a5312f010560",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-14T21:15:00Z",
        "home_team": "Navajo Stirling",
        "away_team": "Tuco Tokkos",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Navajo Stirling",
                                "price": -500
                            },
                            {
                                "name": "Tuco Tokkos",
                                "price": 380
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Navajo Stirling",
                                "price": -500
                            },
                            {
                                "name": "Tuco Tokkos",
                                "price": 385
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "cafa886f34111d94c6566094da190790",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-14T21:45:00Z",
        "home_team": "Josefine Knutsson",
        "away_team": "Piera Rodriguez",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Josefine Knutsson",
                                "price": -245
                            },
                            {
                                "name": "Piera Rodriguez",
                                "price": 200
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Josefine Knutsson",
                                "price": -234
                            },
                            {
                                "name": "Piera Rodriguez",
                                "price": 199
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "8f6ce39347da44b94c7c2fc564a9fb09",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-14T22:45:00Z",
        "home_team": "Adrian Yanez",
        "away_team": "Daniel Marcos",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Adrian Yanez",
                                "price": 120
                            },
                            {
                                "name": "Daniel Marcos",
                                "price": -142
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Adrian Yanez",
                                "price": 125
                            },
                            {
                                "name": "Daniel Marcos",
                                "price": -145
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "5b958e98a94498afaca9e0f9cd7a05df",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T00:15:00Z",
        "home_team": "Joel Alvarez",
        "away_team": "Drakkar Klose",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Drakkar Klose",
                                "price": 260
                            },
                            {
                                "name": "Joel Alvarez",
                                "price": -325
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Drakkar Klose",
                                "price": 255
                            },
                            {
                                "name": "Joel Alvarez",
                                "price": -305
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "e5023716a46cd6a95b69b6dbed4de779",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T00:45:00Z",
        "home_team": "Michael Johnson",
        "away_team": "Ottman Azaitar",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Michael Johnson",
                                "price": -198
                            },
                            {
                                "name": "Ottman Azaitar",
                                "price": 164
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Michael Johnson",
                                "price": -200
                            },
                            {
                                "name": "Ottman Azaitar",
                                "price": 170
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "82ffea49fdc05968754194a821f86295",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T01:00:00Z",
        "home_team": "Colby Covington",
        "away_team": "Joaquin Buckley",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 160
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -192
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 144
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -186
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 163
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -205
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 175
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -210
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 180
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -210
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Colby Covington",
                                "price": 170
                            },
                            {
                                "name": "Joaquin Buckley",
                                "price": -210
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "9b09ddd73595b716689ea4874c41c858",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T01:15:00Z",
        "home_team": "Miranda Maverick",
        "away_team": "Jamey-Lyn Horth",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Jamey-Lyn Horth",
                                "price": 250
                            },
                            {
                                "name": "Miranda Maverick",
                                "price": -310
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Jamey-Lyn Horth",
                                "price": 245
                            },
                            {
                                "name": "Miranda Maverick",
                                "price": -290
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "3a296910119a06e047ec427b8f3bc010",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T01:45:00Z",
        "home_team": "Cub Swanson",
        "away_team": "Billy Quarantillo",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Billy Quarantillo",
                                "price": -162
                            },
                            {
                                "name": "Cub Swanson",
                                "price": 136
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Billy Quarantillo",
                                "price": -152
                            },
                            {
                                "name": "Cub Swanson",
                                "price": 132
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "05951a9f797d395afac19891be2f6c82",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-15T02:15:00Z",
        "home_team": "Amanda Ribas",
        "away_team": "Mackenzie Dern",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Amanda Ribas",
                                "price": -110
                            },
                            {
                                "name": "Mackenzie Dern",
                                "price": -110
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Amanda Ribas",
                                "price": -110
                            },
                            {
                                "name": "Mackenzie Dern",
                                "price": -110
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "215e05c26301ea16539209ff0959eb08",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Alex Pereira",
        "away_team": "Israel Adesanya",
        "bookmakers": []
    },
    {
        "id": "9cd38bf6370ee077bcfe35797761e0b8",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Jon Jones",
        "away_team": "Alex Pereira",
        "bookmakers": []
    },
    {
        "id": "ff9d7b2278b4b993c59b729a76e489de",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Alex Volkanovski",
        "away_team": "Sean O'Malley",
        "bookmakers": []
    },
    {
        "id": "399bb612529db75efd8cad43dc37d395",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Alexa Grasso",
        "away_team": "Erin Blanchfield",
        "bookmakers": []
    },
    {
        "id": "fde4348cad63b50b7833c5fbc4c7700a",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Alexa Grasso",
        "away_team": "Weili Zhang",
        "bookmakers": []
    },
    {
        "id": "1e0eb12f7e7c898005f0fbabfe11e155",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Islam Makhachev",
        "away_team": "Arman Tsarukyan",
        "bookmakers": []
    },
    {
        "id": "1f1c08b55ddbd75e9dfbc0c3ed69a5c6",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Dustin Poirier",
        "away_team": "Colby Covington",
        "bookmakers": []
    },
    {
        "id": "aa8cff57036327aac691d1ed753a0f2c",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Conor McGregor",
        "away_team": "Michael Chandler",
        "bookmakers": []
    },
    {
        "id": "236fc51a7cf776f05415c3e75128a2a8",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Sean Strickland",
        "away_team": "Israel Adesanya",
        "bookmakers": []
    },
    {
        "id": "a5a23abc454121e45c9d05e69bd124c5",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Jon Jones",
        "away_team": "Tom Aspinall",
        "bookmakers": []
    },
    {
        "id": "ee7264fe85417fe21e4d719ab758266b",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Leon Edwards",
        "away_team": "Khamzat Chimaev",
        "bookmakers": []
    },
    {
        "id": "dda5e42061651067dc4b1e3881656284",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Sean Strickland",
        "away_team": "Khamzat Chimaev",
        "bookmakers": []
    },
    {
        "id": "1f0f3cc667d5358477587713243aa40e",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Leon Edwards",
        "away_team": "Shavkat Rakhmonov",
        "bookmakers": []
    },
    {
        "id": "517cfd1144352d6b8afd631b8071f1fd",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2024-12-31T22:59:00Z",
        "home_team": "Weili Zhang",
        "away_team": "Tatiana Suarez",
        "bookmakers": []
    },
    {
        "id": "2d7e3436ab4f325b610ed768a74bb095",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2025-01-09T02:00:00Z",
        "home_team": "Dooho Choi",
        "away_team": "Nate Landwehr",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2024-11-25T16:56:14Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:14Z",
                        "outcomes": [
                            {
                                "name": "Dooho Choi",
                                "price": 136
                            },
                            {
                                "name": "Nate Landwehr",
                                "price": -174
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "ce621d1737fb85c12ba7300a5be7722c",
        "sport_key": "mma_mixed_martial_arts",
        "sport_title": "MMA",
        "commence_time": "2025-12-31T22:00:00Z",
        "home_team": "Daniel Hooker",
        "away_team": "Conor McGregor",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2024-11-25T16:56:13Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2024-11-25T16:56:13Z",
                        "outcomes": [
                            {
                                "name": "Conor McGregor",
                                "price": -142
                            },
                            {
                                "name": "Daniel Hooker",
                                "price": 120
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

class myJason extends Component {
    componentDidMount=()=>{

    }
     pick = (obj, arr) =>
        Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));
     sortTheArrays=async(oddsArray)=>{
      //console.log('odds array',oddsArray)
      //console.log('fights array',theFightsJson)
      var v=0,theMissing=[]
      theFightsJson.map((item1,index)=>{
        v++
       var f1Name=item1.fighter1Name,f2Name=item1.fighter2Name,matchMillis=item1.matchMillis
       //console.log('fighter1Name',f1Name)
       //console.log('fighter2Name',f2Name)

       oddsArray.map((item2)=>{
        //console.log('item1.homeTeamPoints',item2.homeTeamPoints)
        //console.log('item1.awayTeamPoints',item2.awayTeamPoints)
        
        var allName=item2.homeTeam+' '+item2.awayTeam
        /*if(allName.indexOf(item2.homeTeam) >= 0){
            theFightsJson[index]['p1Points']=item2.homeTeamPoints
            theFightsJson[index]['p2Points']=item2.awayTeamPoints 
        }*/
       /* if(allName.indexOf(item2.homeTeam) >= 0))
        { theFightsJson[index]['p1Points']=item2.homeTeamPoints
            theFightsJson[index]['p2Points']=item2.awayTeamPoints}*/
            var subDifference=matchMillis+292200000
       if(f1Name===item2.homeTeam||f2Name===item2.awayTeam){
            console.log('allName',allName)
            theFightsJson[index]['p1Points']=item2.homeTeamPoints
            theFightsJson[index]['p2Points']=item2.awayTeamPoints 
            theFightsJson[index]['commenceTime']=item2.commenceTime
            theFightsJson[index]['timeInMillis']=item2.timeInMillis
        }else{
            if(f1Name===item2.awayTeam||f2Name===item2.homeTeam){
            
                if(subDifference>item2.timeInMillis){
                    theFightsJson[index]['p2Points']=item2.homeTeamPoints
                    theFightsJson[index]['p1Points']=item2.awayTeamPoints 
                    theFightsJson[index]['commenceTime']=item2.commenceTime
                    theFightsJson[index]['timeInMillis']=item2.timeInMillis
                theMissing.push(item2.homeTeam+item2.awayTeam)
                console.log('hainaaaaaa',f1Name,item2.homeTeam,item2.awayTeam)
                console.log('the fighters',v,f1Name,f2Name)
                //f1Name='',f2Name=''
                }
            }
            /*if(f1Name===item2.awayTeam){
                theMissing.push(item2.homeTeam+item2.awayTeam)
                theFightsJson[index]['p1Points']=item2.homeTeamPoints
                theFightsJson[index]['p2Points']=item2.awayTeamPoints 
            }*/
            //console.log()
            //theMissing.push(item2.homeTeam+item2.awayTeam)
        }
       
//awayTeam homeTeam

       })
       
       if(theFightsJson.length===v){
        console.log('fights array 004',theFightsJson)
        console.log('the misssssssssssssssssssssssssing',theMissing)
    }
      })
    }
     sortOddsJson=async(theOddsJson)=>{
        theOddsJson.map((item1,index)=>{
            var i=0
            item1.bookmakers.map((item2)=>{
                i++
                var draftkingsMarket=[]
                if(item2.key==='draftkings'){
                   
                    draftkingsMarket=item2.markets
                    //console.log('draftkings markets',item2.markets)
                    //console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
                    draftkingsMarket.map((item3)=>{
                        //console.log('draftkingsMarket 006',item3.outcomes)
                       const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                         theOddsJson[index].draftkingsOdds=obj
                    })
                }
                if(item1.bookmakers.length===i){
                    //console.log('new array',theOddsJson.length)
                    var m=0,newOddsJson=[]
                    theOddsJson.map((item12,index)=>{
                        m++
                        //console.log('item12.draftkingsOdds',item12.draftkingsOdds)
                        var awayPoints=0,homePoints=0
                        if(item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0){
                            //console.log('shit is undefined')
                        }else{
                            var homeFighterName=item12.home_team
                            var awayFighterName=item12.away_team
                            awayPoints=item12.draftkingsOdds[awayFighterName]
                            homePoints=item12.draftkingsOdds[homeFighterName]
                    }
                    var matchTime= new Date(item12.commence_time);
                    var newItem={awayTeam:item12.away_team,homeTeam:item12.home_team,oddId:item12.id,commenceTime:item12.commence_time,timeInMillis:matchTime.getTime(),
                        awayTeamPoints:awayPoints,homeTeamPoints:homePoints,draftkingsOdds:item12.draftkingsOdds
                    }
                    newOddsJson.push(newItem)
                    })
                    if(m===theOddsJson.length){
                        console.log('new array oldd',theOddsJson)
                        console.log('new array laaast',newOddsJson)
                        this.sortTheArrays(newOddsJson)
                    } 
                }
            })
        })
     }
     render() {
       /* var theWord="Don't Miss A Moment Of UFC 310 Pantoja vs Asakura, Live From T-Mobile Arena In Las Vegas, Nevada On December 7, 2024"
        theWord=theWord.trim().split(" ").slice(-3)
        var day=theWord[1].replace(',',''),month=theWord[0],year=theWord[2]
        //var month=theWord[0]
        //var year=theWord[2]
        var theDate=day+'-'+month+'-'+year
        var dateObj = new Date(theDate); 
        var theMillis = dateObj.getTime();
        console.log('theWorddddddddddddddd',theDate)
        console.log('the milllis',theMillis)*/
        
        theOddsJson.map((item1,index)=>{
       /* //console.log('bookmakers draftkings',item.bookmakers.key)
        if(item.bookmakers['key']==='draftkings'){
            
        }*/
        //console.log('item main '+index,item1)
        var team1=item1.away_team
        var team2=item1.home_team
        ////console.log('item filtered',this.pick(item.bookmakers, ['draftkings']))
        var i=0
        item1.bookmakers.map((item2)=>{
            i++
            //console.log('item book',item2.key)
            var draftkingsMarket=[]
            //return
            if(item2.key==='draftkings'){
               
                draftkingsMarket=item2.markets
                //console.log('draftkings markets',item2.markets)
                //console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
                draftkingsMarket.map((item3)=>{
                    //console.log('draftkingsMarket 006',item3.outcomes)
                    
                    const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));

                     //console.log('kuuuuuuuuuuuu',obj);
                     theOddsJson[index].draftkingsOdds=obj
                    //var newObj = Object.assign({}, ...(item3.outcomes.map(item => ({ [item.key]: item.value }) )));
                    //theOddsJson[index].draftkingsOdds=item3.outcomes
                    ////console.log('draftkingsMarket 100000000000000',newObj)
                    //var priceArray={}
                   /* var priceArray=[],j=0
                    item3.outcomes.map((item4)=>{
                        //console.log('draftkingsMarket 009',item4)
                        j++
                        var name=item4.name
                        var price=item4.price
                        var priceAr={[name]:price}
                        priceArray.push(priceAr)
                        var priceArray2=JSON.stringify(priceArray);
                        //console.log('stringified',priceArray2)
                        if (j===item3.outcomes.length) {
                            theOddsJson[index].draftkingsOdds=priceArray//[0]
                        }
                        //console.log('draftkingsMarket 00100',priceArray)
                        //if(item4.name===team1){theOddsJson[index].draftkingsOdds={[team1]:item4.price}}
                        //if(item4.name===team2){theOddsJson[index].draftkingsOdds={[team2]:item4.price}}
                    })*/
                })
            }
           /* if(item2.key==='draftkings'){
                theOddsJson[index].draftkingsOdds={[team1]:254,[team2]:658}
            }*/
            if(item1.bookmakers.length===i){
                //console.log('new array',theOddsJson.length)
                var m=0,newOddsJson=[]
                theOddsJson.map((item12,index)=>{
                    m++
                    //console.log('item12.draftkingsOdds',item12.draftkingsOdds)
                    var awayPoints=0,homePoints=0
                    if(item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0){
                        //console.log('shit is undefined')
                    }else{
                        var homeFighterName=item12.home_team
                        var awayFighterName=item12.away_team
                        ////console.log('shit is dooope',item12.home_team,item12.draftkingsOdds[fighter1Name])
                        //console.log('home Fighter',homeFighterName,item12.draftkingsOdds[homeFighterName])
                        //console.log('away Fighter',awayFighterName,item12.draftkingsOdds[awayFighterName])
                        awayPoints=item12.draftkingsOdds[awayFighterName]
                        homePoints=item12.draftkingsOdds[homeFighterName]
                        /*item12.draftkingsOdds.map((item13,index)=>{

                    })*/
                }
                var matchTime= new Date(item12.commence_time);
                var newItem={awayTeam:item12.away_team,homeTeam:item12.home_team,oddId:item12.id,commenceTime:item12.commence_time,timeInMillis:matchTime.getTime(),
                    awayTeamPoints:awayPoints,homeTeamPoints:homePoints,draftkingsOdds:item12.draftkingsOdds
                }
                newOddsJson.push(newItem)
                })
                if(m===theOddsJson.length){
                    //console.log('new array oldd',theOddsJson)
                    console.log('new array laaast',newOddsJson)
                    this.sortTheArrays(newOddsJson)
                } 
            }
           // this.pick(obj, ['a', 'c']);
        })
    })
    ////console.log('theSon',theOddsJson)
    return (
      <div>myJason</div>
    )
  }
}

export default myJason






