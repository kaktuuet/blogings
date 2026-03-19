---
title: "Exercise : SSH"
tags:
  - misc
---
[문제 페이지](https://dreamhack.io/wargame/challenges/875)

## 문제 풀이

1. vm에 접속하여 호스트 주소와 포트번호를 확인한다.
2. 주어진 유저명, 주소, 포트 번호를 이용하여 SSH 접속한다.

``
ssh chall@host8.dreamhack.games -p 12518
``
![[ES1.png]]

3. password를 입력하면 chall의 계정으로 접속된다.

![[ES2.png]]

결과 : 이후 ls로 디렉토리를 검사하고 cat flag로 플래그 내용을 확인하면 DH{h3110_6eginn3rs!}임을 알 수 있다.