---
title: welcome
tags:
  - pwnable
---
[문제 페이지](https://dreamhack.io/wargame/challenges/27)


![[../../../../public/attachments/화면 캡처 2026-03-30 002728.png]]


1. 문제 서버를 실행합니다.


2. 리눅스 터미널에서 ``nc 호스트주소 포트번호``로 접속합니다.
![[../../../../public/attachments/화면 캡처 2026-03-30 002759.png]]


### 끝...

![[../../../../public/attachments/화면 캡처 2026-03-30 002824.png]]

너무 짧아서 추가하자면
- 아키텍처 : 64비트 리눅스 환경
- Partial RELRO : 함수 주소록의 일부만 보호, 바꿔치기 가능
- Canary : 버퍼 오버플로우 시도 시 카나리 값에 훼손이 가서 침입을 들킴
- NX(Never execute) : 메모리에 엄격히 실행 불가 공간을 나누어둠
- PIE : 프로그램 실행 시 기준 주소 고정, 공격할 때 계산이 용이함