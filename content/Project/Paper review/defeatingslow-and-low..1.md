---
title: "Defeating Slow-and-Low Threats  \r

  via Diffusion Model-based Generative Inference"
draft: 2026-05-19
tags:
  - paper
---
[논문 출처](https://www.usenix.org/conference/nsdi26/presentation/mirnajafizadeh)


Abstract : Content Delivery Networks(CDNs)는 신뢰 받는 프로토콜을 악용하며 threshold 기반 방어를 회피하는 slow-and-low 위협에 취약하다. 이 연구는 edge defense의 제한된 자원/동작 모니터 부재/비현실적 가정이라는 세가지 한계를 다룬다. 여기서 대응책으로 SketchVision을 제안하며, 이는 위 환경에서 흐름 동작 모니터링과 공격 탐지를 새로 정의하는 vision-inspired 탐지 프레임워크다. 패킷 단위 시간 패턴을 압축 이미지로 인코딩/스케치 노이즈 제거를 위한 확산 모델/부분 관찰로 흐름을 예측해 조기 탐지하는 생성적 추론 파이프라인을 도입한다. SketchVision은 19 종의 slow-and-low 위협에 대해 탐지 성능을 29% 향상시키면서도 대규모 CDN edge 배포에서 효율적이다.

1. Introduction : 최신 서버는 클라우드 호스트 CDN이며 신뢰받는 프로토콜을 이용한 탐지 임계를 넘지 않는 공격에 취약하다. 그러나 일일히 구별해내기 위해서는 자원 소모가 심해 딜레마가 존재한다. 선행 연구는 즉각적이고 방대한 흐름 공격에 초점이 있어 slow-and-low 공격 대응에 적합하지 않다. 이 연구에서 해결할 점은 1. 현재 사용중인 해시 테이블 기반  흐름 탐지가 크기와 메모리 제약이 있음, 2. 최신 기술은 흐름의 시간적 행동 모니터링이 부족하여 사각이 될 수 있음, 3. 모델은 오프라인에서 학습하지만 온라인 실시간 흐름에서는 미탐/오탐이 증가함 이다.

	Vision-inspired Stream Data Sketch Algorithm : 자원 제약을 해결하기 위해 각 패킷의 시간적 패턴을 이미지로 만들고 메타 데이터를 픽셀에 렌더링한다. 모든 흐름을 세분화하여 병목을 해결한다.
	Vision-based Sketch Denoising via Diffusion Model : 흐름에 적합한 노이즈 제거 확산 모델을 사용한다. GPU의 한정된 메모리 활용을 극대화한다. 
	Generative Inference for Early Attack Detection : 확산 모델이 일부 패킷의 시간 관계를 통해 완성본을 예측하도록 한다.

2. Motivating Sketch Vision
	Analysis of Slow-and-Low Attacks : inter-packet delay/duration이 크고 activeness/flow size가 작은 공격을 칭하며, 적합한 예시로는 C2 Communication 공격(control&command?)가 있다.
		![[화면 캡처 2026-05-20 005015.png|345]]
	Challenges
		Lacking Scalable Flow Behavior Monitor : 서버가 방대한 데이터 전송에 특화되어 있어 검증 과정을 상세히 하면 부하가 심하다. 되려 자원 고갈 공격의 취약점으로 작용할 수 있다. 오버헤드를 해결하려면 기밀성이 깨지기도 한다.
		Evading Coarse Behavior-based Detection : 시간이 아닌 행동 기반 패킷 흐름만을 탐지하면 정상 분포를 모방한 패킷을 거르기 힘들다.
		Partial View of Slow-and-Low Attacks : 플로우가 끝난 후 완성된 상태로 탐지하는 것이 아니라 초기와 완료 단계의 통계적 특징이 뒤바뀔 우려가 있다. 이 경우 오판으로 이어진다.

3. Vision-based Attack Detection Framework
	Threat Model : 이 연구에서 위협으로 slow-and-low인 봇넷 도는 멀웨어를 가정한다.
	System Design and Workflow : 이 프레임워크는 edge server entry point에 배포 목적으로 디자인되었다.
		1. vision-inspired sketch(data encode) : XDP(express data path)의 커널 공간에서 스케치를 시작한다. 이것은 패킷 단위로 시간 관계나 메타 데이터 등을 픽셀화하는 것으로, 이때 메모리를 random-sharing하여 사용률을 획기적으로 낮춘다. 1백만 flow 당 14MB 메모리 소모
		2. memory mapping for AI modulew(data retrieval) : 커널에 그려진 이미지를 유저 공간으로 매핑하여 실시간 데이터 회수를 진행한다. threshold를 넘어서면 바로 탐지한다.
		3. sketch denosing and flow forecasting(data process) : 또한 유저 공간에 확산 모델 기반 AI 모듈이 픽셀 간 노이즈 제거/생성 능력을 통한 흐름 예측을 진행한다.
		4. detection and action : 완벽히 복원된 이미지를 CNN으로 위협 여부를 판단하며, slow-and-low일 경우 ACL(access control list)를 업데이트하여 트래픽을 차단한다.