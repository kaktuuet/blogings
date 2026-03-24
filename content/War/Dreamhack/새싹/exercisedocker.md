---
title: "Exercise: Docker"
tags:
  - misc
---
[문제 페이지](https://dreamhack.io/wargame/challenges/876)


## 문제 풀이


1. 주어진 문제 파일을 다운 받아 압축 해제 한다.

2. 게스트 운영체제로 옮긴다.

3. cd로 도커 파일이 있는 경로에 이동한다.

4. 만약 도커 커맨드가 없다면 

 ``
 sudo apt-get install -y docker.io
 ``
 로 다운 받는다.
![[quartz/attachments/ED1.png]]

5. 현 폴더에 있는 도커 파일을 빌드한다.

``
sudo docker build -t test1 .
``
![[ED2.png]]

6. 도커에 배시 셸을 연결해서 실행한다.

``
sudo docker run -it test1 /bin/bash
``
![[ED3.png]]

결과 : cat flag로 플래그가 DH{docker_exercise}임을 알 수 있다.