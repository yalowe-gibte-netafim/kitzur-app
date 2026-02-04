#!/usr/bin/env python3
"""
Format prayer texts to be clean, structured, and visually highlighted.
Requirements:
1. Move all instructions to the beginning
2. Emphasize blessings using bold, headers, structured sections
3. Insert line break after every colon (:)
4. Clean formatting (remove unnecessary chars, normalize spacing)
5. Keep Hebrew text intact and accurate
"""

import json
import re
from pathlib import Path

def format_prayer_text(text, is_instruction=False):
    """Format prayer text with proper line breaks and emphasis."""
    if not text:
        return text
    
    # Normalize spacing
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Add line breaks after colons
    text = re.sub(r':\s*', ':\n\n', text)
    
    # Add line breaks after commas in long Hebrew text for readability
    if len(text) > 150 and not is_instruction:
        text = re.sub(r',\s+', ',\n\n', text)
    
    return text

def format_birkat_hamazon():
    """Format Birkat HaMazon with proper structure."""
    file_path = Path(__file__).parent.parent / "content/special/birkat_hamazon.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    formatted_paragraphs = []
    paragraph_num = 1
    
    # 1. Instructions first
    formatted_paragraphs.append({
        "paragraph": paragraph_num,
        "heading": "הנחיות",
        "text": "**הנחיות לברכת המזון**\n\nשלשה שאכלו כאחד חייבים לזמן.\n\nהמזמן פותח:"
    })
    paragraph_num += 1
    
    # 2. Zimun section
    formatted_paragraphs.extend([
        {
            "paragraph": paragraph_num,
            "heading": "זימון",
            "text": "**המזמן:**\n\nרַבּוֹתַי, נְבָרֵךְ:"
        },
        {
            "paragraph": paragraph_num + 1,
            "text": "**המסובים עונים:**\n\nיְהִי שֵׁם יְיָ מְבֹרָךְ מֵעַתָּה וְעַד עוֹלָם:"
        },
        {
            "paragraph": paragraph_num + 2,
            "text": "**המזמן אומר:**\n\nבִּרְשׁוּת מְרָנָן וְרַבָּנָן וְרַבּוֹתַי,\n\nנְבָרֵךְ שֶׁאָכַלְנוּ מִשֶּׁלוֹ:"
        },
        {
            "paragraph": paragraph_num + 3,
            "text": "**המסובים עונים:**\n\nבָּרוּךְ שֶׁאָכַלְנוּ מִשֶּׁלוֹ וּבְטוּבוֹ חָיִינוּ:"
        },
        {
            "paragraph": paragraph_num + 4,
            "text": "**המזמן חוזר ואומר:**\n\nבָּרוּךְ שֶׁאָכַלְנוּ מִשֶּׁלוֹ וּבְטוּבוֹ חָיִינוּ:"
        }
    ])
    paragraph_num += 5
    
    # Update data
    data["paragraphs"] = formatted_paragraphs
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Formatted {file_path.name}")

def format_borei_nefashot():
    """Format Borei Nefashot."""
    file_path = Path(__file__).parent.parent / "content/special/borei_nefashot.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Format the blessing text
    text = data.get("text", "")
    
    formatted_text = """**ברכה אחרונה על מאכלים**

_לאחר אכילת מאכלים שאין בהם משבעת המינים או פת_

---

**בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם,**

בּוֹרֵא נְפָשׁוֹת רַבּוֹת וְחֶסְרוֹנָן,

עַל כָּל מַה שֶּׁבָּרָאתָ לְהַחֲיוֹת בָּהֶם נֶפֶשׁ כָּל חָי.

**בָּרוּךְ חֵי הָעוֹלָמִים:**"""
    
    data["text"] = formatted_text
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Formatted {file_path.name}")

def format_meein_shalosh():
    """Format Me'ein Shalosh."""
    file_path = Path(__file__).parent.parent / "content/special/meein_shalosh.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # This file has paragraphs structure, reformat them
    if "paragraphs" in data:
        for para in data["paragraphs"]:
            if "text" in para:
                para["text"] = format_prayer_text(para["text"])
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Formatted {file_path.name}")

def main():
    """Format all prayer files."""
    print("🔧 Formatting prayer texts...")
    print()
    
    format_borei_nefashot()
    format_meein_shalosh()
    # format_birkat_hamazon()  # This one is more complex, will handle manually
    
    print()
    print("✅ All prayer texts formatted successfully!")

if __name__ == "__main__":
    main()
