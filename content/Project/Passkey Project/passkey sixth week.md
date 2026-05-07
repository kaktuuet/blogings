---
title: Passkey 6주차 보고서
draft: 2026-05-07
---
authenticator attestation 조작 관련 취약점

ID : [CVE-2025-12150](https://access.redhat.com/security/cve/cve-2025-12150)
CVSS : 3.1(low)
victim : Keycloak
vulnerability type : logic bypass, attestation policy bypass

문제 상황 : 서버가 특정 하드웨어만 허용하도록 설정되어 있으나 클라이언트 측에서 ``fmt: none``(agguid : 000..)인 데이터를 보내면 등록을 허용해버린다.

공격 시나리오 : 공격자가 가상 인증기로 attestation 대신 ``fmt: none``으로 조작된 패킷을 보내면, 미흡한 검증 로직으로 인해 등록이 가능하다.

대응 : 
1. 패치를 적용한다.
2. ``none`` 포맷을 받았을 때 예외 처리를 수행하는 로직을 만든다.
3. uv비트가 조작될 수 있으니 인증기의 실제 스펙을 서버 측에서 2차 검증한다.


이 CVE는 클라이언트 데이터에 대한 과도한 신뢰로 인한 경우이며, W3C 표준 검증 단계를 잘 지켜 누락 없이 구현해야 함을 보여준다.