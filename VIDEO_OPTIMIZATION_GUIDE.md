# 비디오 최적화 방법들

## 1. FFmpeg를 사용한 고화질 재압축 (권장)

### H.264 고화질 재인코딩:
```bash
# 고화질 H.264 (파일 크기 vs 화질 균형)
ffmpeg -i background.mp4 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart background_hq.mp4

# 매우 고화질 H.264 (화질 우선)
ffmpeg -i background.mp4 -c:v libx264 -preset slower -crf 15 -c:a aac -b:a 256k -movflags +faststart background_ultra.mp4
```

### WebM 포맷 추가 (최신 브라우저 최적화):
```bash
# VP9 고화질 WebM
ffmpeg -i background.mp4 -c:v libvpx-vp9 -crf 20 -b:v 2M -c:a libopus -b:a 192k -movflags +faststart background.webm
```

### 해상도별 버전 생성:
```bash
# 4K/UHD (3840x2160)
ffmpeg -i background.mp4 -vf scale=3840:2160 -c:v libx264 -preset slow -crf 18 background_4k.mp4

# 2K/QHD (2560x1440) 
ffmpeg -i background.mp4 -vf scale=2560:1440 -c:v libx264 -preset slow -crf 18 background_2k.mp4

# Full HD (1920x1080)
ffmpeg -i background.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 18 background_1080p.mp4
```

## 2. 브라우저별 호환성 개선

### 다중 포맷 지원:
- MP4 (H.264): 모든 브라우저 호환
- WebM (VP9): Chrome, Firefox 최적화
- HEVC/H.265: 최신 Safari, Edge 지원

## 3. 적응형 비디오 로딩

### 화면 크기별 로딩:
- 모바일: 720p 이하
- 태블릿: 1080p
- 데스크톱: 2K/4K

## 4. 성능 모니터링

현재 비디오 설정:
- 파일 크기: ~50MB
- 예상 해상도: 1080p+
- 코덱: H.264

## 권장 설정:
1. CRF 15-18 (고화질)
2. Preset: slow/slower (압축 효율)
3. movflags +faststart (웹 최적화)
4. 다중 해상도 제공

## 즉시 적용 가능한 개선:
✅ CSS 필터 최적화 (blur 제거)
✅ GPU 가속 활성화
✅ 이미지 렌더링 최적화
✅ 고해상도 디스플레이 대응
✅ 에러 처리 및 폴백 이미지
