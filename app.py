from flask import Flask, render_template
import time

app = Flask(__name__)

# 첫 페이지
@app.route('/')
def index():
    return render_template('index.html')

# 업로드 페이지
@app.route('/upload')
def index2():
    return render_template('index2.html')

# 1. '분석 완료' 페이지
# 'processing-fixed.html'을 렌더링합니다.
@app.route('/analysis-complete')
def analysis_complete():
    return render_template('processing-fixed.html')

# 2. '워크플로우 애니메이션' 페이지
# 'processing-fixed.html'의 버튼을 누르면 이 경로로 이동합니다.
# 'workflow-designer.html'을 렌더링하도록 수정했습니다.
@app.route('/processing')
def processing():
    return render_template('workflow-designer.html')

# AI 에이전트 파이프라인 페이지 (독립형)
@app.route('/pipeline')
def pipeline():
    return render_template('pipeline-standalone.html')

# N8N 스타일 워크플로우 디자이너
@app.route('/workflow')
def workflow():
    return render_template('workflow-designer.html')

# 워크플로우 디자이너 (processing-fixed.html에서 연결)
@app.route('/workflow-designer')
def workflow_designer():
    return render_template('workflow-designer.html')

@app.route('/simple-workflow')
def simple_workflow():
    return render_template('workflow-simple.html')

# 상세 페이지
@app.route('/detail')
def detail():
    return render_template('detail.html')

# 출력 페이지 (workflow-designer.html에서 연결)
@app.route('/output')
def output():
    return render_template('output.html')

# 그리드 뷰 페이지 (output.html에서 연결)
@app.route('/grid-view')
def grid_view():
    return render_template('grid_view.html')

# 커서 테스트 페이지
@app.route('/cursor-test')
def cursor_test():
    return render_template('cursor-test.html', timestamp=int(time.time()))

# React Bits 커서 데모 페이지
@app.route('/cursor-demo')
def cursor_demo():
    return render_template('cursor-demo.html')

# 메탈릭 페인트 로고 데모 페이지
@app.route('/metallic-demo')
def metallic_demo():
    return render_template('metallic-demo.html')

# 업로드 개선 테스트 페이지
@app.route('/upload-improvements')
def upload_improvements():
    return render_template('upload-improvements.html')

# 업로드 깔끔 버전
@app.route('/upload-clean')
def upload_clean():
    return render_template('upload-clean.html')

# Target Cursor 데모 페이지
@app.route('/target-cursor-demo')
def target_cursor_demo():
    return render_template('target-cursor-demo.html')

# 업로드 스크롤 스택 테스트 페이지
@app.route('/upload-scroll-stack')
def upload_scroll_stack():
    return render_template('upload-scroll-stack.html')

# React Bits ScrollStack 실 구현
@app.route('/upload-react-bits')
def upload_react_bits():
    return render_template('upload-react-bits.html')

# 완벽한 ScrollStack 업로드 페이지
@app.route('/upload-stack-perfect')
def upload_stack_perfect():
    return render_template('upload-stack-perfect.html')

# 아이콘 테스트 페이지
@app.route('/icon-test')
def icon_test():
    return render_template('icon-test.html')

# LightRays 테스트 페이지
@app.route('/lightrays-test')
def lightrays_test():
    return render_template('lightrays-test.html')

# 간단한 업로드 테스트 페이지
@app.route('/upload-test')
def upload_test():
    return render_template('upload-simple.html')

# 가장 기본적인 테스트 페이지
@app.route('/basic-test')
def basic_test():
    return render_template('basic-test.html')

# 최소한의 업로드 페이지
@app.route('/upload-minimal')
def upload_minimal():
    return render_template('upload-minimal.html')

# 완전 독립형 업로드 페이지
@app.route('/upload-standalone')
def upload_standalone():
    return render_template('upload-standalone.html')

if __name__ == '__main__':
    # 포트 충돌을 피하기 위해 5002번 포트를 사용합니다.
    app.run(host="0.0.0.0", port=5002, debug=True)
