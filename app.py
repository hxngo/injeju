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

# 처리 페이지
@app.route('/processing')
def processing():
    return render_template('processing-fixed.html')

# 상세 페이지
@app.route('/detail')
def detail():
    return render_template('detail.html')

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
    return render_template('lightrays_test.html')

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
    app.run(host="0.0.0.0", port=8080, debug=True)