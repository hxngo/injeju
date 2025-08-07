#!/bin/bash

# 비디오 최적화 스크립트
cd /Users/hongmac/Downloads/injeju/static/images

echo "🎬 비디오 화질 최적화 시작..."

# 1. 고화질 H.264 버전 생성 (권장)
echo "📹 고화질 H.264 버전 생성 중..."
ffmpeg -i background.mp4 -c:v libx264 -preset slow -crf 15 -c:a aac -b:a 256k -movflags +faststart -pix_fmt yuv420p -profile:v high -level 4.2 -x264opts keyint=30:min-keyint=30 background_hq.mp4

# 2. WebM 고화질 버전 생성
echo "🌐 WebM 고화질 버전 생성 중..."
ffmpeg -i background.mp4 -c:v libvpx-vp9 -crf 18 -b:v 3M -c:a libopus -b:a 256k -movflags +faststart -pix_fmt yuv420p background_hq.webm

# 3. 해상도별 버전 생성 (선택사항)
echo "📐 해상도별 버전 생성 중..."

# 4K 버전 (화질 최우선)
ffmpeg -i background.mp4 -vf scale=3840:2160:flags=lanczos -c:v libx264 -preset slower -crf 12 -c:a aac -b:a 320k -movflags +faststart -pix_fmt yuv420p background_4k.mp4

# 2K 버전 (균형)
ffmpeg -i background.mp4 -vf scale=2560:1440:flags=lanczos -c:v libx264 -preset slow -crf 15 -c:a aac -b:a 256k -movflags +faststart -pix_fmt yuv420p background_2k.mp4

# Full HD 버전 (호환성)
ffmpeg -i background.mp4 -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p background_1080p.mp4

echo "✅ 비디오 최적화 완료!"
echo "📊 생성된 파일들:"
ls -lh background_*

echo ""
echo "🔧 다음 단계:"
echo "1. HTML에서 background.mp4를 background_hq.mp4로 변경"
echo "2. WebM 버전도 background_hq.webm으로 변경"
echo "3. 적응형 로딩을 위한 JavaScript 추가"
