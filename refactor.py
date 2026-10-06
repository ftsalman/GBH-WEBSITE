import os
import re

with open('src/features/home/page/Hompage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

imports_end = content.find('const WEBSITE')
constants_end = content.find('export const Hompage')
constants_str = content[imports_end:constants_end]

constants_code = constants_str.strip() + "\nexport { WEBSITE, services, ecosystem, bookingSteps, faqs, clients, blogPosts };\n"
with open('src/features/home/constants/homeData.js', 'w', encoding='utf-8') as f:
    f.write(constants_code)

print("Extracted constants to homeData.js")
