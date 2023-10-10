import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Modal
} from "react-native";
import { Input } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const countryCodes = [
  { id: 1, name: "Afghanistan", flag: "🇦🇫", code: "AF", dial_code: "+93" },
  { id: 2, name: "Åland Islands", flag: "🇦🇽", code: "AX", dial_code: "+358" },
  { id: 3, name: "Albania", flag: "🇦🇱", code: "AL", dial_code: "+355" },
  { id: 4, name: "Algeria", flag: "🇩🇿", code: "DZ", dial_code: "+213" },
  { id: 5, name: "American Samoa", flag: "🇦🇸", code: "AS", dial_code: "+1684" },
  { id: 6, name: "Andorra", flag: "🇦🇩", code: "AD", dial_code: "+376" },
  { id: 7, name: "Angola", flag: "🇦🇴", code: "AO", dial_code: "+244" },
  { id: 8, name: "Anguilla", flag: "🇦🇮", code: "AI", dial_code: "+1264" },
  { id: 9, name: "Antarctica", flag: "🇦🇶", code: "AQ", dial_code: "+672" },
  {
    id: 10,
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    code: "AG",
    dial_code: "+1268"
  },
  { id: 11, name: "Argentina", flag: "🇦🇷", code: "AR", dial_code: "+54" },
  { id: 12, name: "Armenia", flag: "🇦🇲", code: "AM", dial_code: "+374" },
  { id: 13, name: "Aruba", flag: "🇦🇼", code: "AW", dial_code: "+297" },
  { id: 14, name: "Australia", flag: "🇦🇺", code: "AU", dial_code: "+61" },
  { id: 15, name: "Austria", flag: "🇦🇹", code: "AT", dial_code: "+43" },
  { id: 16, name: "Azerbaijan", flag: "🇦🇿", code: "AZ", dial_code: "+994" },
  { id: 17, name: "Bahamas", flag: "🇧🇸", code: "BS", dial_code: "+1242" },
  { id: 18, name: "Bahrain", flag: "🇧🇭", code: "BH", dial_code: "+973" },
  { id: 19, name: "Bangladesh", flag: "🇧🇩", code: "BD", dial_code: "+880" },
  { id: 20, name: "Barbados", flag: "🇧🇧", code: "BB", dial_code: "+1246" },
  { id: 21, name: "Belarus", flag: "🇧🇾", code: "BY", dial_code: "+375" },
  { id: 22, name: "Belgium", flag: "🇧🇪", code: "BE", dial_code: "+32" },
  { id: 23, name: "Belize", flag: "🇧🇿", code: "BZ", dial_code: "+501" },
  { id: 24, name: "Benin", flag: "🇧🇯", code: "BJ", dial_code: "+229" },
  { id: 25, name: "Bermuda", flag: "🇧🇲", code: "BM", dial_code: "+1441" },
  { id: 26, name: "Bhutan", flag: "🇧🇹", code: "BT", dial_code: "+975" },
  {
    id: 27,
    name: "Bolivia, Plurinational State of bolivia",
    flag: "🇧🇴",
    code: "BO",
    dial_code: "+591"
  },
  {
    id: 28,
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    code: "BA",
    dial_code: "+387"
  },
  { id: 29, name: "Botswana", flag: "🇧🇼", code: "BW", dial_code: "+267" },
  { id: 30, name: "Bouvet Island", flag: "🇧🇻", code: "BV", dial_code: "+47" },
  { id: 31, name: "Brazil", flag: "🇧🇷", code: "BR", dial_code: "+55" },
  {
    id: 32,
    name: "British Indian Ocean Territory",
    flag: "🇮🇴",
    code: "IO",
    dial_code: "+246"
  },
  {
    id: 33,
    name: "Brunei Darussalam",
    flag: "🇧🇳",
    code: "BN",
    dial_code: "+673"
  },
  { id: 34, name: "Bulgaria", flag: "🇧🇬", code: "BG", dial_code: "+359" },
  { id: 35, name: "Burkina Faso", flag: "🇧🇫", code: "BF", dial_code: "+226" },
  { id: 36, name: "Burundi", flag: "🇧🇮", code: "BI", dial_code: "+257" },
  { id: 37, name: "Cambodia", flag: "🇰🇭", code: "KH", dial_code: "+855" },
  { id: 38, name: "Cameroon", flag: "🇨🇲", code: "CM", dial_code: "+237" },
  { id: 39, name: "Canada", flag: "🇨🇦", code: "CA", dial_code: "+1" },
  { id: 40, name: "Cape Verde", flag: "🇨🇻", code: "CV", dial_code: "+238" },
  { id: 41, name: "Cayman Islands", flag: "🇰🇾", code: "KY", dial_code: "+345" },
  {
    id: 42,
    name: "Central African Republic",
    flag: "🇨🇫",
    code: "CF",
    dial_code: "+236"
  },
  { id: 43, name: "Chad", flag: "🇹🇩", code: "TD", dial_code: "+235" },
  { id: 44, name: "Chile", flag: "🇨🇱", code: "CL", dial_code: "+56" },
  { id: 45, name: "China", flag: "🇨🇳", code: "CN", dial_code: "+86" },
  {
    id: 46,
    name: "Christmas Island",
    flag: "🇨🇽",
    code: "CX",
    dial_code: "+61"
  },
  {
    id: 47,
    name: "Cocos (Keeling) Islands",
    flag: "🇨🇨",
    code: "CC",
    dial_code: "+61"
  },
  { id: 48, name: "Colombia", flag: "🇨🇴", code: "CO", dial_code: "+57" },
  { id: 49, name: "Comoros", flag: "🇰🇲", code: "KM", dial_code: "+269" },
  { id: 50, name: "Congo", flag: "🇨🇬", code: "CG", dial_code: "+242" },
  {
    id: 51,
    name: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    code: "CD",
    dial_code: "+243"
  },
  { id: 52, name: "Cook Islands", flag: "🇨🇰", code: "CK", dial_code: "+682" },
  { id: 53, name: "Costa Rica", flag: "🇨🇷", code: "CR", dial_code: "+506" },
  { id: 54, name: "Cote d'Ivoire", flag: "🇨🇮", code: "CI", dial_code: "+225" },
  { id: 55, name: "Cote d'Ivoire", flag: "🇨🇮", code: "CI", dial_code: "+225" },
  { id: 56, name: "Croatia", flag: "🇭🇷", code: "HR", dial_code: "+385" },
  { id: 57, name: "Cuba", flag: "🇨🇺", code: "CU", dial_code: "+53" },
  { id: 58, name: "Cyprus", flag: "🇨🇾", code: "CY", dial_code: "+357" },
  { id: 59, name: "Czech Republic", flag: "🇨🇿", code: "CZ", dial_code: "+420" },
  { id: 60, name: "Denmark", flag: "🇩🇰", code: "DK", dial_code: "+45" },
  { id: 61, name: "Djibouti", flag: "🇩🇯", code: "DJ", dial_code: "+253" },
  { id: 62, name: "Dominica", flag: "🇩🇲", code: "DM", dial_code: "+1767" },
  {
    id: 63,
    name: "Dominican Republic",
    flag: "🇩🇴",
    code: "DO",
    dial_code: "+1849"
  },
  { id: 64, name: "Ecuador", flag: "🇪🇨", code: "EC", dial_code: "+593" },
  { id: 65, name: "Egypt", flag: "🇪🇬", code: "EG", dial_code: "+20" },
  { id: 66, name: "El Salvador", flag: "🇸🇻", code: "SV", dial_code: "+503" },
  {
    id: 67,
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    code: "GQ",
    dial_code: "+240"
  },
  { id: 68, name: "Eritrea", flag: "🇪🇷", code: "ER", dial_code: "+291" },
  { id: 69, name: "Estonia", flag: "🇪🇪", code: "EE", dial_code: "+372" },
  { id: 70, name: "Ethiopia", flag: "🇪🇹", code: "ET", dial_code: "+251" },
  {
    id: 71,
    name: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    code: "FK",
    dial_code: "+500"
  },
  { id: 72, name: "Faroe Islands", flag: "🇫🇴", code: "FO", dial_code: "+298" },
  { id: 73, name: "Fiji", flag: "🇫🇯", code: "FJ", dial_code: "+679" },
  { id: 74, name: "Finland", flag: "🇫🇮", code: "FI", dial_code: "+358" },
  { id: 75, name: "France", flag: "🇫🇷", code: "FR", dial_code: "+33" },
  { id: 76, name: "French Guiana", flag: "🇬🇫", code: "GF", dial_code: "+594" },
  {
    id: 77,
    name: "French Polynesia",
    flag: "🇵🇫",
    code: "PF",
    dial_code: "+689"
  },
  {
    id: 78,
    name: "French Southern Territories",
    flag: "🇹🇫",
    code: "TF",
    dial_code: "+262"
  },
  { id: 79, name: "Gabon", flag: "🇬🇦", code: "GA", dial_code: "+241" },
  { id: 80, name: "Gambia", flag: "🇬🇲", code: "GM", dial_code: "+220" },
  { id: 81, name: "Georgia", flag: "🇬🇪", code: "GE", dial_code: "+995" },
  { id: 82, name: "Germany", flag: "🇩🇪", code: "DE", dial_code: "+49" },
  { id: 83, name: "Ghana", flag: "🇬🇭", code: "GH", dial_code: "+233" },
  { id: 84, name: "Gibraltar", flag: "🇬🇮", code: "GI", dial_code: "+350" },
  { id: 86, name: "Greece", flag: "🇬🇷", code: "GR", dial_code: "+30" },
  { id: 87, name: "Greenland", flag: "🇬🇱", code: "GL", dial_code: "+299" },
  { id: 88, name: "Grenada", flag: "🇬🇩", code: "GD", dial_code: "+1473" },
  { id: 89, name: "Guadeloupe", flag: "🇬🇵", code: "GP", dial_code: "+590" },
  { id: 90, name: "Guam", flag: "🇬🇺", code: "GU", dial_code: "+1671" },
  { id: 91, name: "Guatemala", flag: "🇬🇹", code: "GT", dial_code: "+502" },
  { id: 92, name: "Guernsey", flag: "🇬🇬", code: "GG", dial_code: "+44" },
  { id: 93, name: "Guinea", flag: "🇬🇳", code: "GN", dial_code: "+224" },
  { id: 94, name: "Guinea-Bissau", flag: "🇬🇼", code: "GW", dial_code: "+245" },
  { id: 95, name: "Guyana", flag: "🇬🇾", code: "GY", dial_code: "+592" },
  { id: 96, name: "Haiti", flag: "🇭🇹", code: "HT", dial_code: "+509" },
  { id: 97, name: "Honduras", flag: "🇭🇳", code: "HN", dial_code: "+504" },
  { id: 98, name: "Hong Kong", flag: "🇭🇰", code: "HK", dial_code: "+852" },
  { id: 99, name: "Hungary", flag: "🇭🇺", code: "HU", dial_code: "+36" },
  { id: 100, name: "Iceland", flag: "🇮🇸", code: "IS", dial_code: "+354" },
  { id: 101, name: "India", flag: "🇮🇳", code: "IN", dial_code: "+91" },
  { id: 102, name: "Indonesia", flag: "🇮🇩", code: "ID", dial_code: "+62" },
  {
    id: 103,
    name: "Iran",
    flag: "🇮🇷",
    code: "IR",
    dial_code: "+98"
  },
  { id: 104, name: "Iraq", flag: "🇮🇶", code: "IQ", dial_code: "+964" },
  { id: 105, name: "Ireland", flag: "🇮🇪", code: "IE", dial_code: "+353" },
  { id: 106, name: "Isle of Man", flag: "🇮🇲", code: "IM", dial_code: "+44" },
  { id: 107, name: "Israel", flag: "🇮🇱", code: "IL", dial_code: "+972" },
  { id: 108, name: "Italy", flag: "🇮🇹", code: "IT", dial_code: "+39" },
  { id: 109, name: "Jamaica", flag: "🇯🇲", code: "JM", dial_code: "+1876" },
  { id: 110, name: "Japan", flag: "🇯🇵", code: "JP", dial_code: "+81" },
  { id: 112, name: "Jersey", flag: "🇯🇪", code: "JE", dial_code: "+44" },
  { id: 113, name: "Jordan", flag: "🇯🇴", code: "JO", dial_code: "+962" },
  { id: 114, name: "Kazakhstan", flag: "🇰🇿", code: "KZ", dial_code: "+7" },
  { id: 115, name: "Kenya", flag: "🇰🇪", code: "KE", dial_code: "+254" },
  { id: 116, name: "Kiribati", flag: "🇰🇮", code: "KI", dial_code: "+686" },
  {
    id: 117,
    name: "Republic of Korea",
    flag: "🇰🇵",
    code: "KP",
    dial_code: "+850"
  },
  {
    id: 118,
    name: "Republic of South Korea",
    flag: "🇰🇷",
    code: "KR",
    dial_code: "+82"
  },
  { id: 119, name: "Kosovo", flag: "🇽🇰", code: "XK", dial_code: "+383" },
  { id: 120, name: "Kuwait", flag: "🇰🇼", code: "KW", dial_code: "+965" },
  { id: 121, name: "Kyrgyzstan", flag: "🇰🇬", code: "KG", dial_code: "+996" },
  { id: 122, name: "Laos", flag: "🇱🇦", code: "LA", dial_code: "+856" },
  { id: 123, name: "Latvia", flag: "🇱🇻", code: "LV", dial_code: "+371" },
  { id: 124, name: "Lebanon", flag: "🇱🇧", code: "LB", dial_code: "+961" },
  { id: 125, name: "Lesotho", flag: "🇱🇸", code: "LS", dial_code: "+266" },
  { id: 126, name: "Liberia", flag: "🇱🇷", code: "LR", dial_code: "+231" },
  {
    id: 127,
    name: "Libyan Arab Jamahiriya",
    flag: "🇱🇾",
    code: "LY",
    dial_code: "+218"
  },
  { id: 128, name: "Liechtenstein", flag: "🇱🇮", code: "LI", dial_code: "+423" },
  { id: 129, name: "Lithuania", flag: "🇱🇹", code: "LT", dial_code: "+370" },
  { id: 130, name: "Luxembourg", flag: "🇱🇺", code: "LU", dial_code: "+352" },
  { id: 131, name: "Macao", flag: "🇲🇴", code: "MO", dial_code: "+853" },
  { id: 132, name: "Macedonia", flag: "🇲🇰", code: "MK", dial_code: "+389" },
  { id: 133, name: "Madagascar", flag: "🇲🇬", code: "MG", dial_code: "+261" },
  { id: 134, name: "Malawi", flag: "🇲🇼", code: "MW", dial_code: "+265" },
  { id: 135, name: "Malaysia", flag: "🇲🇾", code: "MY", dial_code: "+60" },
  { id: 136, name: "Maldives", flag: "🇲🇻", code: "MV", dial_code: "+960" },
  { id: 137, name: "Mali", flag: "🇲🇱", code: "ML", dial_code: "+223" },
  { id: 138, name: "Malta", flag: "🇲🇹", code: "MT", dial_code: "+356" },
  {
    id: 139,
    name: "Marshall Islands",
    flag: "🇲🇭",
    code: "MH",
    dial_code: "+692"
  },
  { id: 140, name: "Martinique", flag: "🇲🇶", code: "MQ", dial_code: "+596" },
  { id: 141, name: "Mauritania", flag: "🇲🇷", code: "MR", dial_code: "+222" },
  { id: 142, name: "Mauritius", flag: "🇲🇺", code: "MU", dial_code: "+230" },
  { id: 143, name: "Mayotte", flag: "🇾🇹", code: "YT", dial_code: "+262" },
  { id: 144, name: "Mexico", flag: "🇲🇽", code: "MX", dial_code: "+52" },
  {
    id: 145,
    name: "Micronesia",
    flag: "🇫🇲",
    code: "FM",
    dial_code: "+691"
  },
  { id: 146, name: "Moldova", flag: "🇲🇩", code: "MD", dial_code: "+373" },
  { id: 147, name: "Monaco", flag: "🇲🇨", code: "MC", dial_code: "+377" },
  { id: 148, name: "Mongolia", flag: "🇲🇳", code: "MN", dial_code: "+976" },
  { id: 149, name: "Montenegro", flag: "🇲🇪", code: "ME", dial_code: "+382" },
  { id: 150, name: "Montserrat", flag: "🇲🇸", code: "MS", dial_code: "+1664" },
  { id: 151, name: "Morocco", flag: "🇲🇦", code: "MA", dial_code: "+212" },
  { id: 152, name: "Mozambique", flag: "🇲🇿", code: "MZ", dial_code: "+258" },
  { id: 153, name: "Myanmar", flag: "🇲🇲", code: "MM", dial_code: "+95" },
  { id: 154, name: "Namibia", flag: "🇳🇦", code: "NA", dial_code: "+264" },
  { id: 155, name: "Nauru", flag: "🇳🇷", code: "NR", dial_code: "+674" },
  { id: 156, name: "Nepal", flag: "🇳🇵", code: "NP", dial_code: "+977" },
  { id: 157, name: "Netherlands", flag: "🇳🇱", code: "NL", dial_code: "+31" },
  { id: 158, name: "Netherlands", flag: "🇳🇱", code: "NL", dial_code: "+31" },
  { id: 159, name: "Netherlands", flag: "🇳🇱", code: "NL", dial_code: "+31" },
  {
    id: 160,
    name: "Netherlands Antilles",
    flag: "",
    code: "AN",
    dial_code: "+599"
  },
  { id: 161, name: "New Caledonia", flag: "🇳🇨", code: "NC", dial_code: "+687" },
  { id: 162, name: "New Zealand", flag: "🇳🇿", code: "NZ", dial_code: "+64" },
  { id: 163, name: "Nicaragua", flag: "🇳🇮", code: "NI", dial_code: "+505" },
  { id: 164, name: "Niger", flag: "🇳🇪", code: "NE", dial_code: "+227" },
  { id: 165, name: "Nigeria", flag: "🇳🇬", code: "NG", dial_code: "+234" },
  { id: 166, name: "Niue", flag: "🇳🇺", code: "NU", dial_code: "+683" },
  {
    id: 167,
    name: "Norfolk Island",
    flag: "🇳🇫",
    code: "NF",
    dial_code: "+672"
  },
  {
    id: 168,
    name: "Northern Mariana Islands",
    flag: "🇲🇵",
    code: "MP",
    dial_code: "+1670"
  },
  { id: 169, name: "Norway", flag: "🇳🇴", code: "NO", dial_code: "+47" },
  { id: 170, name: "Oman", flag: "🇴🇲", code: "OM", dial_code: "+968" },
  { id: 171, name: "Pakistan", flag: "🇵🇰", code: "PK", dial_code: "+92" },
  { id: 172, name: "Palau", flag: "🇵🇼", code: "PW", dial_code: "+680" },
  {
    id: 173,
    name: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    code: "PS",
    dial_code: "+970"
  },
  { id: 174, name: "Panama", flag: "🇵🇦", code: "PA", dial_code: "+507" },
  {
    id: 175,
    name: "Papua New Guinea",
    flag: "🇵🇬",
    code: "PG",
    dial_code: "+675"
  },
  { id: 176, name: "Paraguay", flag: "🇵🇾", code: "PY", dial_code: "+595" },
  { id: 177, name: "Peru", flag: "🇵🇪", code: "PE", dial_code: "+51" },
  { id: 178, name: "Philippines", flag: "🇵🇭", code: "PH", dial_code: "+63" },
  { id: 179, name: "Pitcairn", flag: "🇵🇳", code: "PN", dial_code: "+64" },
  { id: 180, name: "Poland", flag: "🇵🇱", code: "PL", dial_code: "+48" },
  { id: 181, name: "Portugal", flag: "🇵🇹", code: "PT", dial_code: "+351" },
  { id: 182, name: "Puerto Rico", flag: "🇵🇷", code: "PR", dial_code: "+1939" },
  { id: 183, name: "Qatar", flag: "🇶🇦", code: "QA", dial_code: "+974" },
  { id: 184, name: "Romania", flag: "🇷🇴", code: "RO", dial_code: "+40" },
  { id: 185, name: "Russia", flag: "🇷🇺", code: "RU", dial_code: "+7" },
  { id: 186, name: "Rwanda", flag: "🇷🇼", code: "RW", dial_code: "+250" },
  { id: 187, name: "Reunion", flag: "🇷🇪", code: "RE", dial_code: "+262" },
  {
    id: 188,
    name: "Saint Barthelemy",
    flag: "🇧🇱",
    code: "BL",
    dial_code: "+590"
  },
  {
    id: 189,
    name: "Saint Helena",
    flag: "🇸🇭",
    code: "SH",
    dial_code: "+290"
  },
  {
    id: 190,
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    code: "KN",
    dial_code: "+1869"
  },
  { id: 191, name: "Saint Lucia", flag: "🇱🇨", code: "LC", dial_code: "+1758" },
  { id: 192, name: "Saint Martin", flag: "🇲🇫", code: "MF", dial_code: "+590" },
  {
    id: 193,
    name: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    code: "PM",
    dial_code: "+508"
  },
  {
    id: 194,
    name: "Saint Vincent",
    flag: "🇻🇨",
    code: "VC",
    dial_code: "+1784"
  },
  { id: 195, name: "Samoa", flag: "🇼🇸", code: "WS", dial_code: "+685" },
  { id: 196, name: "San Marino", flag: "🇸🇲", code: "SM", dial_code: "+378" },
  {
    id: 197,
    name: "Sao Tome and Principe",
    flag: "🇸🇹",
    code: "ST",
    dial_code: "+239"
  },
  { id: 198, name: "Saudi Arabia", flag: "🇸🇦", code: "SA", dial_code: "+966" },
  { id: 199, name: "Senegal", flag: "🇸🇳", code: "SN", dial_code: "+221" },
  { id: 200, name: "Serbia", flag: "🇷🇸", code: "RS", dial_code: "+381" },
  { id: 201, name: "Seychelles", flag: "🇸🇨", code: "SC", dial_code: "+248" },
  { id: 202, name: "Sierra Leone", flag: "🇸🇱", code: "SL", dial_code: "+232" },
  { id: 203, name: "Singapore", flag: "🇸🇬", code: "SG", dial_code: "+65" },
  { id: 204, name: "Slovakia", flag: "🇸🇰", code: "SK", dial_code: "+421" },
  { id: 205, name: "Slovenia", flag: "🇸🇮", code: "SI", dial_code: "+386" },
  {
    id: 206,
    name: "Solomon Islands",
    flag: "🇸🇧",
    code: "SB",
    dial_code: "+677"
  },
  { id: 207, name: "Somalia", flag: "🇸🇴", code: "SO", dial_code: "+252" },
  { id: 208, name: "South Africa", flag: "🇿🇦", code: "ZA", dial_code: "+27" },
  { id: 209, name: "South Sudan", flag: "🇸🇸", code: "SS", dial_code: "+211" },
  {
    id: 210,
    name: "South Georgia",
    flag: "🇬🇸",
    code: "GS",
    dial_code: "+500"
  },
  { id: 211, name: "Spain", flag: "🇪🇸", code: "ES", dial_code: "+34" },
  { id: 212, name: "Sri Lanka", flag: "🇱🇰", code: "LK", dial_code: "+94" },
  { id: 213, name: "Sudan", flag: "🇸🇩", code: "SD", dial_code: "+249" },
  { id: 214, name: "Suriname", flag: "🇸🇷", code: "SR", dial_code: "+597" },
  {
    id: 215,
    name: "Svalbard and Jan Mayen",
    flag: "🇸🇯",
    code: "SJ",
    dial_code: "+47"
  },
  { id: 216, name: "Eswatini", flag: "🇸🇿", code: "SZ", dial_code: "+268" },
  { id: 217, name: "Sweden", flag: "🇸🇪", code: "SE", dial_code: "+46" },
  { id: 218, name: "Switzerland", flag: "🇨🇭", code: "CH", dial_code: "+41" },
  {
    id: 219,
    name: "Syrian Arab Republic",
    flag: "🇸🇾",
    code: "SY",
    dial_code: "+963"
  },
  { id: 220, name: "Taiwan", flag: "🇹🇼", code: "TW", dial_code: "+886" },
  { id: 221, name: "Tajikistan", flag: "🇹🇯", code: "TJ", dial_code: "+992" },
  {
    id: 223,
    name: "United Republic of Tanzania",
    flag: "🇹🇿",
    code: "TZ",
    dial_code: "+255"
  },
  { id: 224, name: "Thailand", flag: "🇹🇭", code: "TH", dial_code: "+66" },
  { id: 225, name: "Timor-Leste", flag: "🇹🇱", code: "TL", dial_code: "+670" },
  { id: 226, name: "Togo", flag: "🇹🇬", code: "TG", dial_code: "+228" },
  { id: 227, name: "Tokelau", flag: "🇹🇰", code: "TK", dial_code: "+690" },
  { id: 228, name: "Tonga", flag: "🇹🇴", code: "TO", dial_code: "+676" },
  {
    id: 229,
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    code: "TT",
    dial_code: "+1868"
  },
  { id: 230, name: "Tunisia", flag: "🇹🇳", code: "TN", dial_code: "+216" },
  { id: 231, name: "Turkey", flag: "🇹🇷", code: "TR", dial_code: "+90" },
  { id: 232, name: "Turkmenistan", flag: "🇹🇲", code: "TM", dial_code: "+993" },
  {
    id: 233,
    name: "Turks and Caicos Islands",
    flag: "🇹🇨",
    code: "TC",
    dial_code: "+1649"
  },
  { id: 234, name: "Tuvalu", flag: "🇹🇻", code: "TV", dial_code: "+688" },
  { id: 235, name: "Uganda", flag: "🇺🇬", code: "UG", dial_code: "+256" },
  { id: 236, name: "Ukraine", flag: "🇺🇦", code: "UA", dial_code: "+380" },
  {
    id: 237,
    name: "United Arab Emirates",
    flag: "🇦🇪",
    code: "AE",
    dial_code: "+971"
  },
  { id: 238, name: "United Kingdom", flag: "🇬🇧", code: "GB", dial_code: "+44" },
  { id: 239, name: "United States", flag: "🇺🇸", code: "US", dial_code: "+1" },
  { id: 240, name: "Uruguay", flag: "🇺🇾", code: "UY", dial_code: "+598" },
  { id: 241, name: "Uzbekistan", flag: "🇺🇿", code: "UZ", dial_code: "+998" },
  { id: 242, name: "Vanuatu", flag: "🇻🇺", code: "VU", dial_code: "+678" },
  {
    id: 243,
    name: "Bolivarian Republic of Venezuela",
    flag: "🇻🇪",
    code: "VE",
    dial_code: "+58"
  },
  { id: 244, name: "Vietnam", flag: "🇻🇳", code: "VN", dial_code: "+84" },
  {
    id: 245,
    name: "Virgin Islands, British",
    flag: "🇻🇬",
    code: "VG",
    dial_code: "+1284"
  },
  {
    id: 246,
    name: "Virgin Islands, U.S.",
    flag: "🇻🇮",
    code: "VI",
    dial_code: "+1340"
  },
  {
    id: 247,
    name: "Wallis and Futuna",
    flag: "🇼🇫",
    code: "WF",
    dial_code: "+681"
  },
  { id: 248, name: "Yemen", flag: "🇾🇪", code: "YE", dial_code: "+967" },
  { id: 249, name: "Zambia", flag: "🇿🇲", code: "ZM", dial_code: "+260" },
  { id: 250, name: "Zimbabwe", flag: "🇿🇼", code: "ZW", dial_code: "+263" }
];

const PhoneNumberPicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dialCode, setDialCode] = useState("+376");
  const [flag, setFlag] = useState("🇦🇩");

  const handleUpdate = (item) => {
    setDialCode(item.dial_code);
    setFlag(item.flag);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TouchableOpacity
          style={styles.InputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dialCode}>
            {flag} <Text>{dialCode}</Text>
          </Text>
        </TouchableOpacity>
        <PhoneInput
          placeholder={"Enter Number"}
          phoneNumber={phoneNumber}
          setValue={setPhoneNumber}
        />
      </View>
      <CoutriesListModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleUpdate={handleUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  InputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  dialCode: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#c0c0c0",
    padding: 15,
    borderRadius: 5
  }
});

export default PhoneNumberPicker;

const PhoneInput = ({ placeholder, setValue, phoneNumber }) => {
  return (
    <Input
      placeholder={placeholder}
      onChangeText={(val) => setValue(val)}
      value={phoneNumber}
      containerStyle={inputStyles.searchBarContainerStyle}
      inputContainerStyle={inputStyles.searchBarInputContainerStyle}
      inputStyle={inputStyles.searchBarInputStyle}
    />
  );
};

const inputStyles = StyleSheet.create({
  searchBarContainerStyle: {
    width: "75%",
    backgroundColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
    marginTop: 15
  },

  searchBarInputContainerStyle: {
    backgroundColor: "white"
  },

  searchBarInputStyle: {
    color: "black",
    fontSize: 16
  }
});

const CoutriesListModal = ({ setModalVisible, modalVisible, handleUpdate }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleUpdate(item)}
        style={[modalStyles.item]}
        key={item.id}
      >
        <Text style={modalStyles.flag}>{item.flag}</Text>
        <Text style={[modalStyles.title]}>
          {item.name} <Text>({item.dial_code})</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={modalStyles.mainIconView}
          onPress={() => setModalVisible(false)}
        >
          <MaterialCommunityIcons name="close-thick" color="black" size={30} />
        </TouchableOpacity>
        <FlatList
          data={countryCodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={modalStyles.flatList}
        />
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontSize: 18
  },
  flag: {
    marginRight: 10
  },
  flatList: {
    marginTop: 10
  },
  mainIconView: {
    alignSelf: "flex-end",
    paddingTop: 20,
    paddingRight: 20
  }
});
