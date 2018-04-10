#! /usr/bin/python
# -*- coding:utf-8 -*-

import json
import re
import string
import sys

TARGET_OUTPUT = 'utils/tiku.json'


def extract_answer(line):
    return [c for c in line if c in string.ascii_uppercase]


def generate(filepath):
    with open(filepath) as fp:
        text = fp.readlines()

    output = []
    questions = []
    question = {}
    for line in text:
        if line.startswith('第'):
            if len(questions) > 0:
                output.append(questions)
            questions = []
            continue
        elif re.search(r'[1-8][\.、]', line):
            question = {}
            question['question'] = line
        elif '答案' in line:
            question['answer'] = extract_answer(line)
            questions.append(question)
        elif re.match(r'^\s*$', line):
            continue
        else:
            question['question'] += line
    output.append(questions)

    # Dump json to target position.
    with open(TARGET_OUTPUT, 'w') as fp:
        fp.write(json.dumps(output))

    print('Complete!')


if __name__ == '__main__':
    try:
        generate(sys.argv[1])
    except IndexError:
        print("Please provide question file in txt format.")
