---
title: Passkey 2주차 보고서
draft: 2026-03-26
---
> ### Client to Authenticator Protocol(CTAP) : 
> ### 유저가 어떠한 플랫폼에서 relying party와 상호작용할 때, roaming authenticator와 상호작용하게 하는 프로토콜
> - 이 프로토콜을 구현할 때 roaming authenticator는 동의 버튼/비밀번호/PIN/생체 인식 등의 사용자 제스처를 획득하는 메커니즘 필요
> - client(host)와 roaming autheticator(authenticator)는 기밀성이 있고 상호 인증된 데이터 전송 채널 필요
> 
> ### Protocol Structure
> - Authenticator API : API 개념처럼 동작, 매개 변수를 입력 받고 출력/오류 코드를 반환
> - Message Encoding : 호스트가 request를 인코딩하여 인증자에게 전송, 인증자는 요청 처리 후 인코딩된 응답 반환
> - Transport-specific Binding : 요청 및 응답의 전송 방식(USB/NFC/bluetooth 등)에 대한 메세지 바인딩
> 
> ### Protocol Overview
> 1. platform이 authenticator과의 연결을 맺음
> 2. ``authenticatorGetInfo`` command를 통해 인증자 정보를 얻음
> 3. authenticator 사용 가능 시 platform이 작동 명령을 보냄
> 4. authenticaotr가 응답 또는 에러를 보냄
> 
> ### Authenticator API Operation
> 1. ``authenticatorMakeCredential`` : 사용자 정보를 받아 새로운 키 쌍 생성, 서버(rp)에 보낼 공개키&증명서(Attestation) 생성
> 2. ``authenticatorGetAssertion`` : 서버가 보낸 challenge에 서명하여 사용자 인증 데이터(Assertion) 생성
> 3. ``authenticatorGetNextAssrtion`` : 동일 조건에 대한 계정이 여러개일 때
> 4. ``authenticatorGetInfo`` : authenticator의 버전/agguid/옵션/최대 메세지 크기 등 상태 정보 반환
> 5. ``authenticatorClientPIN`` : PIN 설정/변경/토큰 생성 시에만 사용, PIN 정보를 주고 받음
> 6. ``authenticatorReset`` : 인증자를 초기화하여 모든 자격 증명을 무효화
> 
> *attestation : 새로 만든 공개키에 대한 증명서*
> 
> *assertion : 일종의 전자서명*
> 
> *agguid : 인증자 증명 글로벌 고유 식별자, 인증자 모델을 나타내는 128비트 식별자*
> 
> ### Message Encoding
> CBOR(Concise Binary Object Representation) : JSON에 기반한 바이너리 데이터 직렬화 포맷
> - JSON 구조를 따라 name-value 쌍을 이루지만 훨씬 빠르고 가벼움
> - 데이터만 보고 해석 가능
> - 같은 데이터 인코딩 시 항상 같은 바이너리 결과, 무결성 검증에 용이
> 
> ### Transport-specific Binding
> - USB : CTAPHID(human interface device) 프로토콜 사용, 드라이버 설치 없음, 데이터를 64바이트 패킷 단위로 전송
> - NFC : CTAPNFC 프로토콜 사용, APDU(application protocol data unit) 구조로 데이터 전송, 전력 없이 태그로 작동
> - Bluetooth : CTAPBLE 프로토콜 사용, GATT(generic attribute profile) 서비스 사용, 페어링 필요, 통신 채널 암호화
> 
> *APDU :명령+데이터+응답으로 구성된 표준 메세지 규격*
> 
> *GATT : 브라우저가 쓴 정보를 읽어 다른 칸에 결과 업데이트하는 트리형 데이터 구조*
> 
> ### Relying Party(Server) : 
> ### 신뢰 당사자, 액세스를 제공하는 서버
> - challenge(무작위 난수)를 생성해 브라우저로 전송, Replay Attack 방어
> - 공개키를 DB에 저장
> - 사용자의 assertion을 공개키로 풀어 검증
> 	- 같은 challenge인가? -> replay attack 방지
> 	- 같은 domain인가? -> 피싱 방지
> 	- counter가 올랐는가? -> 복제 방지

[참조](https://fidoalliance.org/specs/fido-v2.0-ps-20190130/fido-client-to-authenticator-protocol-v2.0-ps-20190130.html#authenticatorMakeCredential)



