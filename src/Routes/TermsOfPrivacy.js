import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 80vh;
  max-width: 767px;
  margin: 0 auto;
  padding: 50px 30px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title_h1 = styled.h1`
  padding: 10px 0 10px 0;
  font-size: 2em;
  font-weight: bold;
`;

const Title_h2 = styled.h2`
  padding: 35px 0 0 0;
  margin-top: 30px;
  border-top: 1px solid #dfdfdf;
  font-size: 1.5em;
  font-weight: bold;
`;

const Title_h3 = styled.h3`
  padding: 20px 0 0 0;
  font-size: 1.17em;
`;

const Content = styled.p`
  margin-top: 10px;
  line-height: 1.7em;
`;

const Content_ol = styled.ol`
  padding: 10px 0 10px 20px;
  list-style-position: outside;
  list-style-type: decimal;
  li {
    line-height: 1.7em;
  }
`;

const Content_ol_roman = styled.ol`
  padding: 10px 0 10px 20px;
  list-style-position: outside;
  list-style-type: lower-roman;
  li {
    line-height: 1.7em;
  }
`;

const Content_ul = styled.ul`
  padding: 10px 0 10px 20px;
  list-style-position: outside;
  list-style-type: disc;
  li {
    line-height: 1.7em;
  }
`;

const Table = styled.table`
  border: 1px solid #444444;
  border-collapse: collapse;
  margin-top: 10px;
  th,
  td {
    border: 1px solid #444444;
    p {
      padding: 10px;
      line-height: 1.7em;
      strong {
        font-weight: bold;
      }
    }
  }
`;

export default () => (
  <Wrapper>
    <Title_h1>개인정보 취급방침 (Ver1.0)</Title_h1>
    <Title_h2>제1장 총직</Title_h2>
    <Title_h3>제1조 [목 적]</Title_h3>
    <Content>
      개인사업자 슬로그(이하 &ldquo;회사&rdquo;)는 정보통신망 이용촉진 및
      정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법,
      등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을
      준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익 보호에
      최선을 다하고 있습니다.
    </Content>
    <Content>
      ① &ldquo;회사&rdquo;는 개인정보취급방침을 통하여 &ldquo;회원&rdquo;께서
      제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 정보보호를
      위해 어떤 조치가 취해지고 있는지 알려드립니다.
    </Content>
    <Content>
      ② &ldquo;회사&rdquo;는 개인정보취급방침을 홈페이지와 애플리케이션에 상시
      공개함으로써 &ldquo;회원&rdquo;께서 언제나 쉽게 보실 수 있도록 조치하고
      있습니다.
    </Content>
    <Content>
      ③ &ldquo;회사&rdquo;는 개인정보처리방침을 개정하는 경우 웹사이트
      공지사항(또는 개별공지)을 통하여 공지할 것입니다.
    </Content>
    <Title_h2>제2장 개인정보의 수집방법 및 항목</Title_h2>
    <Title_h3>제2조 [개인정보 수집 항목]</Title_h3>
    <Content>
      ① &ldquo;회사&rdquo;는 회원가입, 원활한 상담. 각종 서비스의 제공 등을 위해
      아래와 같은 최소한의 개인정보를 수집하고 있습니다.
    </Content>
    <Content_ol>
      <li>회원가입 시점에서 수집하는 필수 항목</li>
      <Content_ul>
        <li>
          성명, 닉네임, Email(아이디), 휴대폰 번호, 사용 범주, 주소, 비밀번호
        </li>
      </Content_ul>
      <li>재화 또는 서비스의 제공 시 수집하는 항목</li>
      <Content_ul>
        <li>
          성명, 이메일주소(아이디), 비밀번호, 전화번호, 신용카드번호,
          은행계좌정보, 통신사 정보, 상품권 번호 등 결제정보 및 구매이력
        </li>
      </Content_ul>
      <li>서비스 이용과정에서 이용자가 입력한 정보 및 작성한 저작물</li>
      <li>서비스 이용과정에서 자동으로 생성되어 수집될 수 있는 정보</li>
      <Content_ul>
        <li>
          프로필 사진, 아이엠 그룹으로 초대한 개별 지인(제3자)의 닉네임 및
          외부서비스 연결을 위한 네이버까페 &middot; 네이버밴드 &middot;
          네이버라인 &middot; 네이버메일 &middot; 카카오톡 &middot; 페이스북
          &middot; 구글 드 라이브, 서비스 이용기록, 방문기록, 불량 이용기록 등의
          정보가 선택적으로 수집될 수 있습니다.
        </li>
      </Content_ul>
      <li>
        개인정보 이외의 정보로서 지역, 나이, 학년, 사용 범주,
        &ldquo;회사&rdquo;가 제공하는 사이트(www.deeeeptime.com),
        애플리케이션(DEEPTIME)을 통하여 측정된 기록 시간, 시간표 등이
        &ldquo;회사&rdquo;의 사이트(www.deeeeptime.com),
        애플리케이션(DEEPTIME)에 특화된 여러 기능을 사용하는 동안 수집됩니다.
      </li>
      <li>
        &ldquo;회사&rdquo;는 개인화된 서비스를 제공하기 위하여
        &ldquo;회원&rdquo;의 정보를 저장하고 수시로 불러오는
        &ldquo;쿠키(Cookie)&rdquo;를 사용합니다. 웹사이트 서버는 쿠키의 내용을
        읽어 환경 설정을 유지 하도록 함으로써 &ldquo;회원&rdquo;의 접속과 편리한
        사용을 돕게 됩니다. 또한 &ldquo;회원&rdquo;이 방문한 회사 의 각 서비스나
        접속 빈도, 방문 시간 및 횟수 등을 분석하고 &ldquo;회원&rdquo;의 이용
        행태, 이벤트 참여 정보 등을 파악하여 &ldquo;회원&rdquo;을 위한
        마케팅이나 개인화 서비스의 제공 등을 위하여 사 용합니다.
      </li>
    </Content_ol>
    <Title_h3>제3조 [개인정보 수집방법]</Title_h3>
    <Content>
      ① 회원가입 서비스 이용과정에서 이용자가 개인정보 수집에 대해 동의를 하고
      직접 정보를 입력하는 경우, 해당 개인정보를 수집
    </Content>
    <Content>
      ② 고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등을 통해
      이용자의 개인정보가 수집 될 수 있습니다.
    </Content>
    <Content>
      ③ 오프라인 이벤트 등에서 서면을 통해 개인정보가 수집될 수 있습니다.
    </Content>
    <Content>
      ④ 회사와 제휴한 외부 기업이나 단체로부터 개인정보를 제공받을 수 있으며,
      이러한 경우에는 제휴사에서 이용자에게 개인정보 제공 동의를 받아야 합니다.
    </Content>
    <Content>
      ⑤ &ldquo;회사&rdquo;가 제공하는 서비스를 웹사이트, 애플리케이션을 통해
      사용하는 과정에서 수집되는 경우
      <Content_ol>
        <li>
          <p>
            쿠키는 웹사이트를 운영하는 데 이용되는 서버가 &ldquo;회원&rdquo;이
            이용하는 브라우저에 보내는 아주 작은 텍스트 파일로
            &ldquo;회원&rdquo;이 이용하는 단말기의 하드디스크에 저장됩니다.
            쿠키는 사용하는 각 브라우저의 설정에서 삭제가 가능합니다.
          </p>
        </li>
      </Content_ol>
    </Content>
    <Title_h2>제3장 개인정보의 관리</Title_h2>
    <Title_h3>제4조 [개인정보 수집 및 이용목적]</Title_h3>
    <Content>
      ① 수집된 &ldquo;회원&rdquo;의 개인정보는 다음과 같은 목적으로 이용됩니다.
    </Content>
    <Content>② 서비스의 원활한 제공 및 운영</Content>
    <Content>③ 회원 관리</Content>
    <Content_ol>
      <li>회원제 서비스 이용에 따른 본인확인</li>
      <li>개인식별</li>
      <li>불량회원의 부정 이용 방지와 비인가 사용방지</li>
      <li>가입 의사 확인</li>
      <li>분쟁 조정을 위한 기록보존</li>
      <li>불만 처리 등 민원처리</li>
      <li>고지사항 전달</li>
      <li>법정대리인 본인 확인</li>
      <li>유료서비스 이용 시 요금 정산</li>
    </Content_ol>
    <Content>④ 마케팅 및 광고에의 활용</Content>
    <Content>⑤ 고객별 맞춤 서비스 제공</Content>
    <Content_ol>
      <li>통계학적 특성에 따른 서비스 제공 및 광고 게재</li>
      <li>정기 간행물 발송</li>
      <li>서비스의 유효성 확인</li>
      <li>이벤트 및 광고성 정보 제공 및 참여 기회 제공</li>
      <li>접속 빈도 파악</li>
      <li>
        회원의 서비스 이용에 대한 통계(회원님의 개인정보는 광고를 의뢰한
        개인이나 단체에는 제공되지 않습니다.)
      </li>
    </Content_ol>
    <Content>
      ⑥ 마케팅 및 광고에 활용하는 경우는 별도의 동의를 받으며 동의를
      거부하더라도 서비스의 이용에 제한이 없습니다.
    </Content>
    <Title_h3>제5조 [개인정보의 제공]</Title_h3>
    <Content>
      &ldquo;회사&rdquo;는 이용자의 개인정보를 원칙적으로 외부에 제공하지
      않습니다. 다만, 아래의 경우에는 예외로 합니다.
    </Content>
    <Content>① 이용자들이 사전에 동의한 경우</Content>
    <Content>
      ② 법령의 규정에 따르거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
      수사기관의 요구가 있는 경우
    </Content>
    <Content>
      ③ 영업의 양수 사유가 발생하여 회원의 개인정보 이전이 필요한 경우 회사는
      정보통신망 이용촉진 및 정보보호에 관한 법률 등 관계 법률에서 규정한 절차와
      방법에 따라 개인정보 이전에 관한 사실 등을 사전에 고지하며, 회원에게
      개인정보 이전에 관한 동의 철회권을 부여합니다.
    </Content>
    <Title_h3>제6조 [개인정보 파기절차]</Title_h3>
    <Content>
      &ldquo;회사&rdquo;는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는
      해당 정보를 바로 파기합니다.
    </Content>
    <Content>
      ① 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로
      옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한
      정보보호 사유에 따라(보 유 및 이용 기간 참조) 일정 기간 저장된 후
      파기됩니다.
    </Content>
    <Content>
      ② 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는
      이외의 다른 목적으로 이용되지 않습니다.
    </Content>
    <Title_h3>제7조 [개인정보 파기방법]</Title_h3>
    <Content>
      ① 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을
      사용하여 삭제합니다.
    </Content>
    <Content>
      ② 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
    </Content>
    <Title_h3>제8조 [개인정보의 처리 및 보유기간]</Title_h3>
    <Content>
      &ldquo;회사&rdquo;는 개인정보의 수집 및 이용목적이 달성된 때에는, 법령
      또는 내부방침에 의해 보존할 필요가 있는 경우를 제외하고는 6조와 7조에 따라
      바로 파기됩니다.
    </Content>
    <Content>① 각 개인정보 처리 및 보유기간은 다음과 같습니다.</Content>
    <Content_ol>
      <li>계약 또는 청약 철회 등에 관한 기록 : 5년</li>
      <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
      <li>소비자의 불만 또는 분쟁 처리에 관한 기록 : 3년</li>
      <li>신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년</li>
      <li>표시/광고에 관한 기록 : 6개월</li>
      <li>세법이 규정하는 모든 거래에 관한 장부 및 증빙서류 : 5년</li>
      <li>
        가입자 전기통신일시, 개시∙종료시간, 상대방 가입자번호, 사용도수 : 1년
      </li>
      <li>컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월</li>
    </Content_ol>
    <Content>
      ② &ldquo;회사&rdquo;는 정보통신망법에 따라 12개월 이상 로그인하지 않은
      경우나, 서비스 이용이 없는 경우 해당 &ldquo;회원&rdquo;의 아이디 및
      개인정보를 휴면 아이디로 별도 관리합니다. 이러한 경우 위 12개월의 기간
      도래 30일 전까지 &ldquo;회사&rdquo;는 &ldquo;회원&rdquo;의 개인정보가
      분리되어 저장, 관리되고 있다는 사실과 기간 만료일 및 해당 개인정보의
      항목을 전자우편, 서면, 모사전송, 전화 또는 이와 유사한 방법 중 어느 하나의
      방법으로 &ldquo;회원&rdquo;에게 알려드립니다. 휴면 아이디로 전환된
      개인정보는 4년간 보관 후 지체 없이 파기합니다.
    </Content>
    <Title_h3>제9조 [개인정보의 열람, 정정, 탈퇴 및 동의 철회 방법]</Title_h3>
    <Content>
      ① &ldquo;회원&rdquo;은 경우에 따라 아래의 방법으로 등록된
      &ldquo;회원&rdquo;의 개인정보를 열람하거나 정정, 회원탈퇴, 삭제 및
      처리정지를 요구할 수 있습니다.
    </Content>
    <Content>
      ② 개인정보 관리책임자에게 서면, 전화 또는 이메일을 통한 요청(제09장
      개인정보관리책임자 항목 참고)
    </Content>
    <Content>
      ③ &ldquo;회원&rdquo;이 개인정보의 오류에 대한 정정을 요청하신 경우 회사는
      정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.
    </Content>
    <Content>
      ④ 본 조에 따른 권리 행사는 정보 주체의 법정대리인이나 위임을 받은 자 등
      대리인을 통하여서 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지
      제11호 서식에 다른 위임장을 제출하셔야 합니다.
    </Content>
    <Title_h3>제10조 [이용자 및 법정대리인의 권리와 행사방법]</Title_h3>
    <Content>
      ① &ldquo;회사&rdquo;는 만14세 미만 아동의 개인정보를 수집하고 있지 않으나,
      &ldquo;회사&rdquo;의 의도와 달리 만 14세 미만 아동이 &ldquo;회사&rdquo;에
      개인정보를 제공하였다면, 이용자 및 법정 대리인은 언제든지 등록되어 있는
      자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며
      가입해지를 요청할 수도 있습니다.
    </Content>
    <Content>
      ② &ldquo;회사&rdquo;는 원칙적으로 만 14세 미만 아동의 회원가입을 받지 않고
      있습니다.
    </Content>
    <Content>
      ③ 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이
      조치하겠습니다. &ldquo;회사&rdquo;는 이용자 혹은 법정 대리인의 요청에 의해
      해지 또는 삭제된 개인정보는 &ldquo;회사&rdquo;가 수집하는 개인정보의 보유
      및 이용기간에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수
      없도록 처리하고 있습니다.
    </Content>
    <Title_h2>제4장 개인정보의 기술적/관리적 보호 대책</Title_h2>
    <Title_h3>제11조 [내부관리 계획의 수립 및 시행]</Title_h3>
    <Content>
      ① &ldquo;회사&rdquo;는 개인정보의 안전한 처리를 위하여 내부관리계획을
      수립하고 시행하고 있습니다.
    </Content>
    <Content>② 비밀번호 암호화</Content>
    <Content_ol>
      <li>
        &ldquo;회원&rdquo; 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고
        있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고
        있는 본인에 의해서만 가능합니다.
      </li>
    </Content_ol>
    <Content>
      ③ &ldquo;회사&rdquo;는 이용자들의 개인정보를 취급함에 있어 개인정보가
      분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과
      같은 기술적/관리적 대책을 강구하고 있습니다. 단, 이용자 본인의 부주의나
      인터넷 또는 통신상의 문제로 ID, 비밀번호 등 개인정보가 유출되어 발생한
      문제에 대해 회사는 일체의 책임을 지지 않습니다.
    </Content>
    <Title_h2>제6장 개인정보의 제3자 공유 및 제공</Title_h2>
    <Content>
      &ldquo;회사&rdquo;는 &ldquo;회원&rdquo;의 개인정보를 본
      개인정보취급방침에서 명시된 범위를 초과하여 이용하거나 제3자(타인 또는 타
      기업, 기관)에 제공하지 않습니다. 다만, 13조에 명시된 조항은 예외로 합니다.
    </Content>
    <Title_h3>제12조 [개인정보 제공에 대한 &ldquo;회원&rdquo;의 동의]</Title_h3>
    <Content>
      ① 더 나은 서비스 제공을 위하여 &ldquo;회사&rdquo;가 &ldquo;회원&rdquo;의
      개인정보를 타 기업 등 제3자에게 제공하는 것이 필요한 경우에는
      &ldquo;회사&rdquo;는 사전에 제휴사가 누구인지, 제공 또는 공유되어야 하는
      개인정보 항목이 무엇인지, 제공 또는 공유되는 개인정보의 이용목적, 언제까지
      공유되며 어떻게 보호 관리되는지에 대하여 &ldquo;회원&rdquo;에게 고지하여
      동의를 구할 것입니다.
    </Content>
    <Content>
      ② &ldquo;회원&rdquo;이 동의하지 않는 정보는 제3자에 제공하거나 제3자와
      공유하지 않습니다. 이 경우 고지 및 동의 방법은 홈페이지 내의 공지사항을
      통해 최소 7일 이전부터 고지함과 동시에 전자우편 등의 방법을 통해 동의를
      받습니다. 단 사전 공지가 불가능한 예외적인 경우는 제공 및 공유가 공지와
      동시에 이루어질 수 있습니다.
    </Content>
    <Content>
      ③ &ldquo;회사&rdquo;는 개인정보 취급방침에서 정한 본래의 수집목적 및
      이용목적에 반하여 무분별하게 &ldquo;회원&rdquo;의 개인 정보가 제공되지
      않도록 최대한 노력하겠습니다.
    </Content>
    <Content>
      ④ &ldquo;회원&rdquo;은 &ldquo;회사&rdquo;의 개인정보 수집 및 이용 동의를
      거부할 수 있습니다. 다만, 본 개인정보 수집 및 이용에 동의하지 않으시면
      &ldquo;회사&rdquo;의 웹사이트, 애플리케이션에 회원가입을 할 수 없습니다.
    </Content>
    <Content>
      ⑤ 여러분이 본 개인정보 수집 및 이용 동의서의 체크 박스를 클릭하는 경우,
      이는 개인정보 수집 및 이용에 동의한다는 의사표시를 한 것으로 간주됩니다.
    </Content>
    <Title_h3>제13조 [개인정보의 예외적 제공]</Title_h3>
    <Content>① 서비스 제공에 따른 요금 정산을 위하여 필요한 경우</Content>
    <Content>
      ② 관계 법령에 의하여 수사, 재판 또는 행정상의 목적으로 관계기관으로부터
      요구가 있을 경우
    </Content>
    <Content>
      ③ 통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로
      가공하여 제공하는 경우
    </Content>
    <Content>
      ④ 금융 실명거래 및 비밀보장에 관한법률, 신용정보의 이용 및 보호에 관한
      법률, 전기통신기본법, 전기통신사업법, 지방세법, 소비자보호법, 한국은행법,
      형사소송법 등 기타 관계 법령에서 정한 절차에 따른 요청이 있는 경우
    </Content>
    <Content>
      ⑤ &ldquo;회사&rdquo;가 영업의 전부 또는 일부를 양도하거나, 합병/상속
      등으로 서비스 제공자의 권리, 의무를 이전 승계하는 경우 개인정보보호 관련
      &ldquo;회원&rdquo;의 권리를 보장하기 위하여 반드시 그 사실을
      &ldquo;회원&rdquo;에게 통지합니다.
    </Content>
    <Title_h2>제5장 수집한 개인정보의 위탁</Title_h2>
    <Title_h3>제14조 [개인정보 위탁처리 기관 및 업무]</Title_h3>
    <Content>
      ① &ldquo;회사&rdquo;는 서비스 이용계약의 이행 등을 위해 개인정보를 외부
      전문 업체에 위탁하여 운영하고 위탁 시 관계 법령에 따라 개인정보가 안전하게
      관리될 수 있도록 철저하게 관리하고 있습니다.
    </Content>
    <Content>② 기관 및 업무 상세</Content>
    <Table>
      <tbody>
        <tr>
          <td>
            <p>수탁업체</p>
          </td>
          <td>
            <p>위탁 업무 내용</p>
          </td>
          <td>
            <p>이전되는 개인정보 항목</p>
          </td>
          <td>
            <p>개인정보의 보유 및 이용기간</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <strong>㈜다날</strong>
            </p>
          </td>
          <td>
            <p>
              <strong>결제 및 환불 처리</strong>
            </p>
          </td>
          <td>
            <p>
              <strong>신용카드, 결제정보, 핸드폰 번호</strong>
            </p>
          </td>
          <td>
            <p>
              회원탈퇴 시 혹은 위탁계약
              <br />
              종료 시까지
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <strong>
                twilio Inc,
                <br />
                sendgrid Inc
              </strong>
            </p>
          </td>
          <td>
            <p>
              <strong>
                본인확인,
                <br />
                SMS/MMS(문자메시지)
              </strong>
            </p>
          </td>
          <td>
            <p>
              <strong>
                이메일 주소, 핸드폰 번호,
                <br />
                닉네임, 성함
              </strong>
            </p>
          </td>
          <td>
            <p>
              회원탈퇴 시 혹은 위탁계약
              <br />
              종료 시까지
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <strong>Channel Corp</strong>
            </p>
          </td>
          <td>
            <p>
              <strong>
                고객관리, 채팅상담,
                <br />
                마케팅
              </strong>
            </p>
          </td>
          <td>
            <p>
              <strong>
                성명, 닉네임, Email,
                <br />
                휴대폰 번호, 사용 범주, 주소
              </strong>
            </p>
          </td>
          <td>
            <p>
              회원탈퇴 시 혹은 위탁계약
              <br />
              종료 시까지
            </p>
          </td>
        </tr>
      </tbody>
    </Table>
    <Title_h2>제7장 회원의 권리와 의무</Title_h2>
    <Title_h3>제15조 [회원의 의무]</Title_h3>
    <Content>
      ① &ldquo;회원&rdquo;은 본인의 개인정보를 최신의 상태로 정확하게 입력하여
      불의의 사고를 예방해 주시기 바랍니다.
    </Content>
    <Content>
      ② &ldquo;회원&rdquo;이 입력한 부정확한 정보로 인해 발생하는 사고의 책임은
      &ldquo;회원 자신에게 있으며 타인 정보의 도용 등 허위정보를 입력할 경우
      계정의 이용이 제한될 수 있습니다.
    </Content>
    <Content>
      ③ &rdquo;회사&ldquo;가 운영하는 서비스를 이용하는 &rdquo;회원&ldquo;은
      개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지
      않을 의무도 가지고 있습니다.
    </Content>
    <Content>
      ④ &rdquo;회원&ldquo;은 회원 계정(Email), 비밀번호를 포함한 개인정보가
      유출되지 않도록 조심해야 하며, 게시물을 포함한 타인의 개인정보를 훼손하지
      않도록 유의해야 합니다. 만약 이 같은 책임을 다하지 못하고 타인의 정보 및
      타인의 존엄성을 훼손할 경우에는 「정보통신망 이용촉진 및 정보보호 등에
      관한 법률」등에 의해 처벌받을 수 있습니다.
    </Content>
    <Title_h3>제 16조 [회원의 권리]</Title_h3>
    <Content>
      ① &ldquo;회원&rdquo;은 언제든지 쿠키의 설치를 거부하거나 삭제할 수
      있습니다. 이에 따라 &ldquo;회원&rdquo;은 웹 브라우저에서 옵션을
      설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
      아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 단, 쿠키의 저장을 거부할
      경우 로그인이 필요한 회사의 일부 서비스는 이용에 어려움이 있을 수
      있습니다. 쿠키 설치 허용 여부는 웹브라우저 별로 따로 설정해야 합니다.
    </Content>
    <Title_h2>제8장 &rdquo;회사&ldquo;의 면책</Title_h2>
    <Title_h3>제17조 [링크사이트의 대한 책임]</Title_h3>
    <Content>
      ① &ldquo;회사&rdquo;는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수
      있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에
      대해서는 본 &ldquo;개인정보처리방침&rdquo;이 적용되지 않습니다.
    </Content>
    <Content>
      ② &ldquo;회사&rdquo;가 기술적인 보완조치를 취하였음에도 불구하고 해킹 등
      기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한
      정보의 훼손 및 멸실, 이용자가 작성한 게시물에 의한 각종 분쟁 등에 관해서는
      책임이 없습니다.
    </Content>
    <Title_h2>제9장 개인정보관리 책임자 및 변경 고지의 의무</Title_h2>
    <Title_h3>제18조 [개인정보관리 책임자]</Title_h3>
    <Content>
      회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률에서 규정한
      관리책임자를 다음과 같이 지정합니다.
    </Content>
    <Content>[고객서비스 담당 &amp; 개인정보 관리 책임자]</Content>
    <Content_ul>
      <li>이름 : 박영석</li>
      <li>부서 : Customer Relationship Management</li>
      <li>연락처 : 010-9381-8107</li>
      <li>이메일 : iam.ai.project.pl@gamil.com</li>
      <li>고객지원 메일 : deeptime.customer@gmail.com</li>
    </Content_ul>
    <Content_ol>
      <li>
        개인정보관리책임자는 고객의 개인정보를 보호하고 유출을 방지하는
        책임자로서 이용자가 안심하고 회사가 제공하는 서비스를 이용할 수 있도록
        도와드리며, 개인정보를 보호하는데 있어 이용자에게 고지한 사항들에 반하여
        사고가 발생할 시에는 이에 관한 책임을 집니다.
      </li>
      <li>
        &ldquo;회원&rdquo;은 &ldquo;회사&rdquo;의 서비스(또는 사업)를
        이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
        등에 관한 사항을 개인정보 보호 책임자 및 담당 부서로 문의하실 수
        있습니다. &ldquo;회사&rdquo;는 &ldquo;회원&rdquo;의 문의에 대해 지체
        없이 답변 및 처리해드릴 것입니다.
      </li>
      <li>
        &ldquo;회사&rdquo;가 기술적인 보완조치를 취하였음에도 불구하고 해킹 등
        기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한
        정보의 훼손 및 멸실, 이용자가 작성한 게시물에 의한 각종 분쟁 등에
        관해서는 책임이 없습니다.
      </li>
      <li>
        기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
        문의하시기 바랍니다.
      </li>
      <Content_ol_roman>
        <li>- 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
        <li>- 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
        <li>- 경찰청 사이버안전국 (www.ctrc.go.kr / 국번없이 182)</li>
      </Content_ol_roman>
    </Content_ol>
    <Title_h3>제19조 [개인정보취급 방침 변경 고지의 의무]</Title_h3>
    <Content>
      &ldquo;회사&rdquo;는 법률이나 서비스의 변경사항을 반영하기 위한 목적
      등으로 개인정보 취급방침을 수정할 수 있습니다. 개인정보 취급방침이
      변경되는 경우 회사는 변경 사항을 공지하며, 변경된 개인정보 취급방침은
      공지사항을 통해 게시하며 게시한 날로부터 7일 후부터 효력이 발생합니다.
      하지만 피치 못하게 &ldquo;회원&rdquo;의 권리에 중요한 변경이 있을 경우
      변경될 내용을 30일 전에 미리 알려드리겠습니다.
    </Content>
    <Content>공고일자 : 2020.12.15</Content>
    <Content>시행일자 : 2020.12.15</Content>
  </Wrapper>
);
