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

export default () => (
  <Wrapper>
    <Title_h1>서비스 이용약관 (학생회원)</Title_h1>
    <Title_h2>제1장 총 칙</Title_h2>
    <Title_h3>제1조 [목 적]</Title_h3>
    <Content>
      이 약관은 개인사업자 슬로그(이하 &ldquo;회사&rdquo;라 합니다)가 제공하는
      &ldquo;DEEPTIME 서비스&rdquo;(이하 &ldquo;서비스&rdquo;라 합니다)의 이용
      조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다. 본
      약관은 PC 통신, 스마트폰(안드로이드, 아이폰 등) 앱 등을 이용하는
      전자상거래에 대해서도 그 성질에 반하지 않는 한 준용됩니다.
    </Content>
    <Title_h3>제2조 [정 의])</Title_h3>
    <Content>① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</Content>
    <Content_ol>
      <li>
        DEEPTIME 서비스 : 회사가 IOT 등의 기기(이하 &ldquo;장비&rdquo;라
        합니다)를 설치한 공간의 네트워크 설비와 연결, 설치된 장비가 회원 영상을
        촬영. 촬영된 영상을 AI 프로그램을 통해 분석하여 회원의 학습 또는 사용
        시간을 측정, 측정된 데이터를 기반으로 홈페이지 또는 전용 프로그램을 통해
        서비스를 제공.
      </li>
      <li>IOT 등의 기기의 명칭 : 라즈베리파이: 메타, 라우터: 허브.</li>
      <li>
        개별 서비스 : DEEPTIME서비스 외 기타 서비스(Ex. 수학, 과학 등의 학습
        콘텐츠).
      </li>
      <li>서비스 : DEEPTIME 서비스와 개별 서비스를 통칭하는 용어.</li>
      <li>
        회원: 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고
        회사가 제공하는 서비스를 이용하는 자.
      </li>
      <li>
        체험 서비스 : 회사의 홈페이지에서 회사의 장비를 사용하지 않고 이용자의
        PC, 스마트기기, 화상캠 등으로 촬영한 영상을 AI프로그램을 통한 영상처리
        후 데이터화하는 것을 체험하는 것.
      </li>
      <li>
        서비스제공중단 : 회사가 정한 일정한 요건에 따라 일정 기간 서비스 이용을
        보류하는 것.
      </li>
      <li>
        침해사고 : 해킹, 컴퓨터바이러스, 논리폭탄, 메일폭탄, 서비스 거부 또는
        고출력 전자기파 등에 의하여 정보통신망 또는 이와 관련된 정보시스템을
        공격하는 행위로 인하여 발생한 사태.
      </li>
      <li>
        장비 계약자 : 장비의 설치를 해당 장소(스터디카페, 독서실 등)에 요청,
        회사와 이용계약을 맺고 장비의 개통을 한 사람(장소의 관리자, 임차인,
        소유주 등).
      </li>
    </Content_ol>
    <Content>
      ② 제1항에서 정한 용어의 정의 이외의 것은 관계 법령 등에서 정하는 바에
      의합니다.
    </Content>
    <Title_h3>제3조 [약관의 적용과 변경]</Title_h3>
    <Content>
      ① 본 약관은 회원이 약관의 내용에 동의하며 회원가입을 신청하고, 회사가 그
      신청에 대하여 승낙함으로써 효력이 발생합니다.
    </Content>
    <Content>
      ② 회사가 본 약관의 내용을 변경하는 경우 기본 회원들에게는 제4조 3항에서
      명시한 방법으로 통지함으로써 효력이 발생합니다.
    </Content>
    <Content>
      ③ 회사는 필요하다고 인정하는 경우 이 약관을 변경할 수 있으며
      &ldquo;약관의규제에관한법률&rdquo;, &ldquo;정보통신망이용촉진 및
      정보보호등에관한법률(이하 &ldquo;정보통신망법&rdquo;)&rdquo; 등의 관련
      법령에 위배되지 않는 범위 안에서 약관을 개정할 수 있습니다.
    </Content>
    <Content>
      ④ 회사는 약관이 변경되는 경우에 변경된 약관의 내용과 시행일을 정하여, 그
      시행일로부터 최소7일(이용자에게 불리하거나 중대한 사항의 변경은 30일)
      이전부터 시행일 후 일정 기간동안 공지하고, 기존 이용자에게는 변경된 약관,
      적용일자 및 변경사유(변경될 내용 중 중요사항에 대한 설명을 포함)를 별도의
      전자적 수단(전자우편, 문자메시지, 서비스 내 전자쪽지발송,
      홈페이지(http://www.deeeeptime.com/) 초기화면에 게시, 알림 메시지를 띄우는
      등의 방법)으로 통지합니다. 변경된 약관은 공지하거나 통지한 시행일로부터
      효력이 발생합니다.
    </Content>
    <Content>
      ⑤ 회사가 본조 4항에 따라 변경된 약관을 공지 또는 통지하는 경우 변경에
      동의하지 아니한 경우 공지일 또는 통지를 받은 날로부터 7일(이용자에게
      불리하거나 중대한 사항의 변경인 경우에는 30일) 내에 계약을 해지할 수
      있으며, 계약해지의 의사표시를 하지 아니한 경우에는 변경에 동의한 것으로
      본다.”라는 취지의 내용을 함께 통지합니다.
    </Content>
    <Content>
      ⑥ 회사가 전항에 따라 변경된 약관을 공지 또는 통지하면서 회원에게 7일 기간
      내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게
      공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한
      경우 회원이 개정약관에 동의한 것으로 봅니다.
    </Content>
    <Content>
      ⑦ 이 약관에 동의하는 것은 정기적으로 웹을 방문하여 약관의 변경사항을
      확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해
      발생하는 이용자의 피해는 회사에서 책임지지 않습니다.
    </Content>
    <Content>
      ⑧ 회원이 변경된 약관에 동의하지 않을 경우 회사는 해당 회원의 탈퇴(해지)를
      요청 할 수 있습니다.
    </Content>
    <Content>
      ⑨ 약관에 명시되지 않은 사항은 관계 법령 및 고시, 이 약관의 취지에 따라
      적용합니다.
    </Content>
    <Content>
      ⑩ 회사는 개별서비스에 대해서는 별도의 이용약관 및 운영정책을 둘 수
      있습니다.
    </Content>
    <Content>
      ⑪ 이 약관의 일부가 무효라 하더라도, 무효인 부분 외의 나머지 부분은
      계속해서 약관으로서 효력을 가집니다.
    </Content>
    <Title_h2>제2장 계약의 성립과 이용</Title_h2>
    <Title_h3>제4조 [계약의 성립]</Title_h3>
    <Content>
      ① 회사는 이용신청자에게 이 약관을 제시하여 동의를 받으며, 회원가입 시 이
      약관을 게시합니다. 이 경우 제 22조를 준용합니다.
    </Content>
    <Content_ol>
      <li>
        본 약관은 이용신청자가 약관의 내용에 동의하며 회원가입을 신청하고,
        회사가 그 신청에 대하여 승낙함으로써 효력이 발생합니다.
      </li>
      <li>
        회사는 회원이 언제든지 이 약관을 인쇄하거나, 다운로드 할 수 있는 조치를
        취합니다.
      </li>
      <li>
        회원으로의 가입은 회사 서비스의 이용을 희망하는 자가 약관의 내용을
        숙지한 후 동의함을 표시하고, 회사가 제시하는 소정의 가입 양식에 관련
        사항을 기재하여 회원 가입을 신청하여야 합니다.
      </li>
      <li>
        실명이나 실제 정보를 입력하지 않은 회원은 법적인 보호를 받을 수 없으며
        본 약관의 관련 규정에 따라 서비스 사용에 제한을 받을 수 있습니다.
      </li>
    </Content_ol>
    <Content>
      ② 회사는 이용신청자에 대하여 업무상 또는 기술상 특별한 사유가 없는 한
      접수순서에 따라 서비스 이용을 승낙합니다.
    </Content>
    <Content>
      ③ 회사는 이용신청에 대한 승낙 또는 유보를 전화, 팩스, E-Mail, 방문, 우편,
      SMS, 서비스내에 팝업창의 게시, 홈페이지 회원가입 화면에 게시 등의 방법으로
      이용신청자에게 통지하고, 승낙하는 경우 이용신청자에게 다음 사항을
      통보합니다. 단, 제1호부터 제3호의 사항은 회사 홈페이지 공지나 안내 등으로
      대신할 수 있습니다.
    </Content>
    <Content_ol>
      <li>회원의 권익 보호 및 의무에 관한 사항</li>
      <li>회사의 의무에 관한 사항</li>
      <li>기타 서비스 이용에 관한 중요한 사항</li>
    </Content_ol>
    <Content>
      ④ 회사는 이용신청자가 이 약관에 동의하고 서비스를 신청한 경우 이용신청자의
      정보를 이용하여 e-mail, 방문, 우편, SMS, 유무선 전화, 회사의 서비스 내에
      공지 또는 팝업창을 게시, 홈페이지 초기화면에 게시, 알림 메시지를 띄우는
      방법 등 기타 전자적 장치를 통해 이용신청자에게 정보를 전달할 수 있으며,
      이용신청자는 정보의 수신에 동의한 것으로 간주합니다.
    </Content>
    <Content_ol>
      <li>
        본 항 과같이 통지한 경우 그때부터 7일 이내에 회원(이용신청자)이 회사가
        정하는 방법으로 그 통지 내용에 동의하지 않음을 표시하지 않을 경우 그
        회원에게는 통지 내용이 도달하였고 통지 내용에 동의하였다고 간주합니다.
      </li>
      <li>
        통지 내용에 동의하지 아니하는 회원(이용신청자)은 회사에 회원탈퇴를
        요청할 수 있습니다.
      </li>
    </Content_ol>
    <Title_h3>제5조 [이용신청에 대한 승낙의 제한]</Title_h3>
    <Content>
      ① 회사는 고객의 이용신청에 대하여 업무 수행상 또는 기술상 지장이 있다고
      판단되는 다음 각호에 해당하는 경우에는 승낙하지 아니합니다.
    </Content>
    <Content_ol>
      <li>
        타인 명의로 신청한 경우 또는 제출서류의 내용이 허위인 경우(실명이
        아니거나 제3자 명의의 사용, 필수제출 정보를 허위로 또는 누락, 오기하여
        신청한 경우)
      </li>
      <li>
        타인의 명의를 도용한 사실이 있거나 처벌받은 경우 또는 명의도용을 상습
        허위 신고한 사실이 있는 경우
      </li>
      <li>
        이용신청 시 회사가 요청하는 본인확인 및 가입동의를 위한 인증이 실패한
        경우
      </li>
      <li>공공의 안녕질서 및 미풍양속을 해할 우려가 있는 경우</li>
      <li>
        회사의 설비에 여유가 없거나 기술적인 문제로 인하여 서비스 제공이 어려운
        경우
      </li>
      <li>
        제6조 제3항의 각호에 의하여 회사로부터 고객 자격을 상실한 적이 있는 경우
      </li>
    </Content_ol>
    <Content>
      ② 회사는 이용신청이 다음 각호의 하나에 해당하는 경우에는 이용신청에 대한
      승낙 제한 사유가 해소될 때까지 승낙을 유보하고 이를 이용신청자에게
      통지합니다. 단, 명의도용 등에 의한 선의의 피해자는 확인 후 승낙합니다.
    </Content>
    <Content_ol>
      <li>
        신용정보의 이용 및 보호에 관한 법률, 신용정보집중기관의
        신용정보관리규약, 신용정보사의 신용정보 공통관리규약 등에 따라
        채무불이행정보(정보통신요금체납자로 등록된 경우 포함), 공공기록정보,
        금융질서문란자 정보 등에 등록되어 있는 경우, 명의도용 등 통신시장의
        질서를 문란케 하여 정보통신상거래질서문란자로 등록되어 있는 경우 또는
        부정사용이 우려되어 이용정지자로 등록되어 있는 경우
      </li>
      <li>
        이 약관 및 개별 이용계약서와 다르게 서비스를 이용함으로써 장비의 손상
        또는 대량의 트랙픽량을 유발하여 타 이용자의 서비스 이용 또는 시스템
        장애를 야기하거나 야기할 우려가 있는 경우
      </li>
    </Content_ol>
    <Title_h3>제6조 [회원의 해제 및 해지]</Title_h3>
    <Content>
      ① 회원은 언제든지 서비스 내 계정삭제 화면을 통하여 이용계약 해지 신청을 할
      수 있으며, 슬로그는 관계 법령 등이 정하는 바에 따라 이를 즉시 처리하여야
      합니다.
    </Content>
    <Content>
      ② 회원이 계약을 해지하는 경우, 회원을 식별할 수 있는 계정, 전화번호,
      이메일 등과 같이 본인계정에 등록된 개인정보 일체는 삭제됩니다. 다만,
      회원이 회사의 서비스를 이용하는 동안 생성된 공부 시간 등의 사용자 생성
      콘텐츠는 삭제되지 않고 회사가 지속해서 관리할 수 있습니다.
    </Content>
    <Content>
      ③ 회사는 회원이 다음 중 하나에 해당하는 경우 이용계약을 해지할 수 있으며,
      회사는 필요한 경우 해지 7일 전까지 그 뜻을 회원에게 통지하여 고객의 의견을
      들을 수 있습니다. 다만 그 사실을 미리 통지하는 것이 곤란할 경우에는 선
      조치 후 통지할 수 있습니다.
    </Content>
    <Content_ol>
      <li>
        실명이 아니거나 제3자 또는 법인의 명의사용 등 필수제출 정보를 허위로
        제공 또는 누락, 오기하여 신청한 경우
      </li>
      <li>
        정당한 사유 없이 이용실태 확인을 거부 또는 방해하여 위약 사항을 은폐한
        경우
      </li>
      <li>시스템 운영에 심각한 장애를 초래하거나 고의로 방해한 경우</li>
      <li>타 회원의 서비스 이용에 장애를 일으킬 수 있는 행위를 하는 경우</li>
      <li>
        제9조의 서비스 제공중단 사유를 1월 이내에 해소 또는 정당하게 소명하지
        않은 경우
      </li>
      <li>제11조에 관한 조항을 위반한 경우</li>
      <li>기타 고객이 이용약관에 위반하거나 서비스를 부당하게 이용하는 경우</li>
      <li>
        공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등을 타인에게
        유포하는 행위
      </li>
    </Content_ol>
    <Content>
      ④ 회원이 현행법 위반 및 고의 또는 중대한 과실로 &ldquo;회사&rdquo;에
      손해를 입힌 경우에는 사전 통보 없이 이용계약을 해지할 수 있습니다.
    </Content>
    <Title_h3>제7조 [서비스 제공 내역]</Title_h3>
    <Content>
      ① 라즈베리파이(메타)의 카메라를 통해 획득한 영상을 라우터(허브)로 전송, AI
      프로그램으로 영상을 데이터화하여 웹과 앱을 통해 사용자가
      라즈베리파이(메타) 앞에서 위치한 시간을 데이터화하여 저장, 해당 데이터를
      기반한 분석 등을 제공하는 서비스입니다.
    </Content>
    <Content>
      ② 장비 계약자를 통해 장비의 개통을 한 장소에 라즈베리파이(메타)기기를
      설치하며 회원은 해당 장비를 통해 본 서비스를 이용합니다.
    </Content>
    <Content>
      ③ 한 개의 라즈베리파이(메타) 당 1개의 채널을 제공하며 각 채널당 1명의
      사용자가 사용할 수 있습니다. 사용자는 웹 또는 앱에서 회원가입을 통해
      영상처리 된 개인의 학습기록을 설정 및 확인 할 수 있습니다.
    </Content>
    <Content>
      ④ 회사에서 제공하는 &lsquo;DEEPTIME&rsquo;서비스는 장비를 지정된 장소에
      설치하여 촬영한 영상을 처리하는 소프트웨어 서비스를 제공합니다. 통신 환경
      등 외부적 환경 요소에 관해서는 무관합니다.
    </Content>
    <Content>
      ⑤ 촬영하는 화면의 실시간 데이터화 중 회원의 환경에 따라 서비스의 품질의
      차이가 있을 수 있습니다. 이의 개선을 위해 회원의 환경 개선과 인터넷 회선의
      변경 및 신설은 자유롭게 가능하나 이는 회원이 부담합니다. 서비스의 품질은
      사용 공간의 와이파이 또는 통신상태에 따라 영향을 받을 수 있습니다.
    </Content>
    <Content>
      ⑦ 회사는 장비 계약자가 설치한 장소에서 DEEPTIME 서비스를 사용 할 경우
      회원에게 별도의 요금을 청구하지 않습니다. 다만, 개별서비스의 사용을 할
      경우는 개별 서비스의 운영 정책에 따릅니다.
    </Content>
    <Content>
      ⑥ 체험 서비스는 회사의 홈페이지를 통해 이용 가능하며 회원의 스마트폰,
      노트북 등 영상 촬영이 가능한 전자기기를 통해 영상 촬영, AI프로그램을 통한
      영상처리, 시간 누적 데이터확인 등을 체험할 수 있으며 해당 영상과 데이터는
      저장되지 않습니다.
    </Content>
    <Title_h3>제8조 [장비의 이용 및 설치]</Title_h3>
    <Content>
      ① 회원은 장비가 설치 된 좌석에서 장비 계약자(독서실, 스터디카페 등의
      관리자 또는 해당 장소의 임차인, 임대인 등)에게 인증번호를 받아 인증 절차를
      거친 후 시간 측정 서비스를 이용 할 수 있습니다.
    </Content>
    <Content>
      ② 회원은 &ldquo;회사&rdquo;의 장비를 임의로 조작하지 아니하며 장비의 손상
      또는 장애가 있을 경우에는 해당 장비 계약자에게 문의하여 조치를 받아야
      합니다. 만약, 직접 장비를 직접 조작하여 발생한 장애와 손상의 경우 회사는
      책임이 없습니다.
    </Content>
    <Content_ol>
      <li>
        장비의 봉인용 라벨을 고객, 회원 등이 개봉하여 손상될 경우 해당 장비는
        무상 수리를 지원하지 않습니다.
      </li>
    </Content_ol>
    <Content>
      ③ 회원이 장비를 직접 설치하여 이용하는 경우, 설치 불량으로 인해 발생한
      장애와 해당 장비의 수리와 교환에 대해서 회사는 책임이 없습니다.
    </Content>
    <Content>
      ④ 회원이 장비를 최초 설치장소 이외의 장소로 이동하고자 할 경우 회사의 사전
      서면 동의를 득하여야 합니다. 이를 위반하여 이동한 경우에는 회사는 그
      이동일 이후의 장비 하자에 대하여는 일체의 A/S 책임을 부담하지 않습니다.
    </Content>
    <Title_h3>제9조 [서비스제공중단]</Title_h3>
    <Content>
      ① 회사는 고객이 다음 중 하나에 해당할 경우 서비스(전체 또는 일부 서비스)
      제공을 중단할 수 있으며, 그 사실을 고객에게 통지합니다.
    </Content>
    <Content_ol>
      <li>제5조1항 각호에 해당하는 사유가 서비스 제공 중 확인된 경우</li>
      <li>제11조를 위반한 경우</li>
      <li>
        고객이 서비스와 관련하여 개인정보 보호법 등 관련 법령을 위반하는 경우
      </li>
    </Content_ol>
    <Content>
      ② 회사는 제 1항1호의 규정에 의한 서비스제공중단을 하고자 할 경우, 그 사유,
      일시, 및 기간을 명시하여 서비스제공중단일의 7일 전까지 이용자에게
      통지합니다.
    </Content>
    <Content_ol>
      <li>
        본조 2항에도 불구하고 회사가 사전에 통지할 수 없는 부득이한 사유가 있는
        경우 사후에 통지할 수 있습니다.
      </li>
    </Content_ol>
    <Content>
      ③ 회원은 제2항의 서비스제공중단 통지에 대하여 이의가 있을 경우 통지를 받은
      날로부터 7일 이내에 이의신청을 할 수 있습니다. 회사는 이용자의 이의신청이
      있는 경우 서비스제공중단을 보류하고 이의신청 내용확인의 결과를 통지합니다.
    </Content>
    <Content>
      ④ 고객은 제1항 각호에 해당하는 사유가 발생하는 경우에는 민∙형사상의 책임을
      질 수 있습니다.
    </Content>
    <Content>
      ⑤ 회사의 서비스는 장비를 설치한 장소의 장비 계약자(해당 장소의 관리자,
      임차인, 임대인 등)의 요청 또는 계약의 만료 등의 이유로 사용이 중단될 수
      있습니다.
    </Content>
    <Content_ol>
      <li>
        회사의 장비가 기존 사용하던 장소에서 회수되어 서비스를 이용하지 못하는
        경우 회원은 장비가 설치된 다른 장소에서 제8조 1항에 절차를 거친 후
        회원의 기존 ID(고유번호), Password(비밀번호)를 통해 서비스를 이용할 수
        있습니다.
      </li>
      <li>
        장비가 설치된 장소의 장비 계약자(해당 장소의 관리자, 임차인, 임대인
        등)의 계약 만료로 장비의 회수, 또는 이용정지의 이유로 해당 장소에서
        서비스 이용이 불가능할 경우. 회사는 고객이 서비스를 이용하지 못하여 입는
        피해에 대한 모든 책임을 지지 않습니다.
      </li>
      <li>장비계약의 경우 별도의 장비계약 이용약관을 따릅니다.</li>
    </Content_ol>
    <Content>
      ⑥ 회사는 회원이 계속해서 1년 이상 로그인하지 않는 경우, 회원정보의 보호 및
      운영의 효율성을 위해 이용을 제한할 수 있습니다.
    </Content>
    <Content>
      ⑦ 회사는 시스템 개선공사, 장비 증설, 정기점검 등 서비스를 제공할 수 없는
      불가피한 사유가 있어 서비스 제공을 일시적으로 중지하고자 하는 경우에는 그
      사유 및 중지 기간 등을 명시하여 회사 홈페이지 등에 사전 공지하고 E-mail,
      SMS 등을 통해 고객 또는 그 대리인에게 통보합니다. 단, 회사가 긴급하게
      이용을 중지할 필요가 있다고 인정하는 경우나 회원의 귀책 사유로 인하여
      통보할 수 없는 경우에는 그러하지 아니합니다.
    </Content>
    <Content>
      ⑧ 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의
      필요상 수정, 중단, 변경할 수 있으며. 이에 대하여 관계 법령에 특별한 규정이
      없는 한 회원에게 별도의 보상을 하지 않습니다.
    </Content>
    <Content>
      ⑨ 회사는 서비스제공중단의 사유가 해소되면 즉시 서비스를 다시 제공합니다.
    </Content>
    <Title_h2>제3장 계약 당사자의 의무</Title_h2>
    <Title_h3>제10조 [회사의 의무]</Title_h3>
    <Content>
      ① 회사는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는
      즉시 처리하여야 합니다. 즉시 처리가 곤란한 경우에는 그 사유와 처리 일정을
      전화, 팩스, E-Mail, 방문, 우편, SMS 등으로 통보합니다.
    </Content>
    <Content>
      ② 회사는 서비스 제공과 관련하여 취득한 회원의 정보를 본인의 사전동의 없이
      타인에게 누설, 배포할 수 없으며 사전에 회원에게 고지 또는 이용약관에
      명시하여 동의를 얻는 목적 이외의 용도로 사용할 수 없습니다. 단, 다음
      각호에 해당하는 경우에는 그러하지 않습니다.
    </Content>
    <Content_ol>
      <li>관계법령에 의한 수사상의 목적으로 관계기관으로부터 요구받는 경우</li>
      <li>
        통계작성, 학술연구 또는 시장조사를 위하여 특정 개인을 식별할 수 없는
        형태로 제공하는 경우
      </li>
      <li>
        원활한 서비스를 제공하기 위하여 회사의 위임을 받은 업무위탁계약을 체결한
        업무수탁자에게 제공하는 경우. 단, 이 경우 회사는 회원 정보 위임에 관한
        사실을 회원에게 고지합니다.
      </li>
      <li>다른 법률에 특별한 규정이 있는 경우</li>
    </Content_ol>
    <Content>
      ④ 회사는 회원의 연체 정보를 신용정보법 제15조의 신용정보회사 등에 제공하기
      전에 이용자 본인(법인 고객은 제외)에게 연체정보 제공 사실을 알립니다.
    </Content>
    <Content>
      ⑤ 회사는 회원의 서비스 이용 관련 민원을 자체적으로 처리하기 위한 고객센터
      (고충 처리창구)를 아래와 같이 운영합니다.
    </Content>
    <Content>『 고객센터 전화번호 : 070-8955-8107』</Content>
    <Title_h3>제11조 [회원의 의무]</Title_h3>
    <Content>
      ① 회원은 서비스를 본래의 제공 목적과 용도에 맞게 사용하여야 합니다.
    </Content>
    <Content>
      ② 회원은 이용계약 체결 및 이행에 필요한 주소, 연락처, 요금납부책임자 등의
      개인신상정보 등을 회사에 허위로 제공하여서는 안 되며, 정보변경(요금납입자
      정보 변경, 이용자 정보 변경 등) 시 지체 없이 회사에 통보하여 갱신하여야
      합니다. 이를 소홀히 하여 발생된 불이익은 고객의 책임으로 합니다.
    </Content>
    <Content>
      ③ 회원은 네트워크 환경을 통한 바이러스(VIRUS) 프로그램 또는 외부의 불법적
      침입으로부터 회원의 설비 및 정보를 보호하여야 합니다.
    </Content>
    <Content>
      ④ 회원은 공공의 안녕질서 또는 미풍양속을 저해하는 다음 각호의 행위를
      하여서는 안 됩니다.
    </Content>
    <Content_ol>
      <li>범죄행위를 목적으로 하거나 범죄행위를 교사하는 행위</li>
      <li>반국가적 행위의 수행을 목적으로 하는 내용</li>
      <li>선량한 풍속, 기타 사회질서를 저해하는 내용</li>
      <li>
        공직선거 및 선거부정 방지법, 선거관리위원회가 금하는 불법 선거운동 행위
      </li>
      <li>
        타인에게 불쾌감, 혐오성 등 미풍양속을 저해하는 닉네임 또는 아이디를 생성
        및 사용하는 행위
      </li>
    </Content_ol>
    <Content>
      ⑤ 회원의 귀책사유로 인한 고객의 자료 유실, 망실 등에 대해서 회사는
      책임지지 않습니다.
    </Content>
    <Content>
      ⑥ 회원은 리버스엔지니어링, 디커파일, 디스어셈블 및 기다 일체의 가공행위를
      통하여 서비스를 복제, 분해 또 모방 기타 변형하는 행위를 하지 말아야합니다.
    </Content>
    <Content>
      ⑦ 회사의 별도 서면 승인이 없는 한, 회원은 회사로부터 구매하여 사용하는
      장비 또는 제공받는 서비스 등과 관련한 모든 제반 사항에 대해서 이 약관 또는
      장비공급계약에 정한 목적과 다른 목적으로 사용하거나 타 회사나 개인에 대한
      설치, 판매, 대여, 양도 등을 할 수 없으며, 만약 이를 사용하여 타인의 사생활
      또는 초상권, 기타 타인의 권리를 침해하거나 기타 불법행위를 하는 경우에는
      모든 책임은 회원에게 있습니다.
    </Content>
    <Title_h3>
      제12조 [고객의 ID(고유번호) 및 Password(비밀번호)에 대한 의무]
    </Title_h3>
    <Content>
      ① 고객은 고객 ID(고유번호) 및 Password(비밀번호) 관리를 철저히 하여야
      합니다.
    </Content>
    <Content>
      ② 고객은 본인의 ID(고유번호) 및 Password(비밀번호)를 제3자에게 이용하게
      해서는 안 됩니다.
    </Content>
    <Content>
      ③ 고객이 본인의 ID(고유번호) 및 Password(비밀번호)를 도난당하거나 제3자가
      사용하고 있음을 인지한 경우에는 바로 회사에 이를 통보하고 회사의 안내가
      있는 경우에는 그에 따라야 합니다.
    </Content>
    <Content>
      ④ 고객 ID(고유번호)와 Password(비밀번호)의 관리 소홀, 부정 사용에 의하여
      발생하는 모든 결과에 대한 책임은 고객 본인에게 있으며, 회사의 시스템 고장
      등 회사의 책임 있는 사유로 발생하는 문제에 대해서는 회사가 책임을 집니다.
    </Content>
    <Content>
      ⑤ 고객의 ID(고유번호)는 회사의 사전 동의 없이 변경할 수 없습니다.
    </Content>
    <Content>
      ⑥ 고객은 개인 정보 유출로 인한 피해 확산을 막기 위해 회사의 비밀번호 운영
      정책에 따라 본인 확인 후 Password(비밀번호) 변경 절차를 수행해야 하고,
      회사의 비밀번호 운영 정책에 따른 비밀번호 변경 절차를 수행하지 않을
      경우에는 로그인이 제한될 수 있습니다.
    </Content>
    <Title_h3>제13조 [프로그램 설치 및 데이터 수집]</Title_h3>
    <Content>
      ① 회사는 서비스를 제공함에 있어 필요한 경우 회원에게 애플리케이션 및
      별도의 프로그램을 설치하도록 할 수 있으며, 회원은 원하지 않을 경우 그
      설치를 거부할 수 있습니다. 다만, 회원이 애플리케이션 및 별도 프로그램의
      설치를 거부하는 경우 서비스 이용이 제한될 수 있습니다.
    </Content>
    <Content>
      ② 회사는 회원의 PC, 태블릿PC, 휴대전화 등 서비스 이용 단말기의 데이터를
      수집하고 이용할 수 있습니다.
    </Content>
    <Content>
      ③ 회사는 전 항의 데이터를 서비스를 개선하거나 회원의 사용환경에 적합한
      서비스 또는 기술을 제공하기 위한 목적으로만 사용하며 그 외의 다른 목적으로
      사용하지 않습니다.
    </Content>
    <Title_h3>제5장 침해사고 대응</Title_h3>
    <Title_h3>제14조 [침해사고 긴급대응]</Title_h3>
    <Content>
      ① 회사는 다음 각호에 해당하는 경우에는 당해 서비스의 전부 또는 일부의
      제공을 중단할 수 있습니다.
    </Content>
    <Content_ol>
      <li>
        외부에서 발생한 침해사고로 인하여 회사에 심각한 장애가 발생할 우려가
        있다고 판단되는 경우
      </li>
      <li>
        회원의 정보시스템에 발생한 이상 현상으로 인하여 다른 회원 또는 집적된
        정보통신시설의 정보통신망에 심각한 장애를 발생시킬 우려가 있거나, 장애
        발생에 대한 원인 파악을 위해 차단을 필요로 하는 경우
      </li>
      <li>
        정보통신망에 발생한 이상 현상의 확산 속도로 보아 회원이 사전 통지를 받을
        시간적 여유가 없다고 판단될 경우 또는 회원이 제공한 연락처로 연락이
        불가능할 경우
      </li>
      <li>국가 비상사태, 천재지변 등으로 인한 경우</li>
    </Content_ol>
    <Content>
      ② 회사는 제1항의 규정에 의하여 당해 서비스의 제공을 중단하는 때에는 중단
      사유, 발생일시, 기간, 내용 등을 명시하여 홈페이지 공시 등을 이용하여
      회원에게 즉시 통보하여야 합니다.
    </Content>
    <Content>
      ③ 회사는 중단 사유가 해소된 때에는 즉시 당해 서비스의 제공을 재개하여야
      합니다.
    </Content>
    <Title_h3>제15조 [침해사고에 대한 면책규정]</Title_h3>
    <Content>
      회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 규정된 바에 따라
      안전진단을 수검하고, 선량한 관리자의 주의의무를 다한 경우에는 침해사고
      등에 대한 책임을 지지 아니하며, 다음과 같은 경우에는 책임을 지지 않습니다.
    </Content>
    <Content_ol>
      <li>
        서비스를 제공할 당시 과학 기술 수준으로는 결함의 존재를 발견할 수 없는
        경우
      </li>
      <li>
        서비스를 제공할 당시의 법령이 정하는 기준을 준수하였음에도 발생하였을
        경우
      </li>
    </Content_ol>
    <Title_h2>제6장 손해배상</Title_h2>
    <Title_h3>제16조 [손해배상]</Title_h3>
    <Content>
      ① 회사가 고의 또는 중과실로 회원에게 손해를 끼친 경우, 손해에 대하여
      배상할 책임이 있습니다.
    </Content>
    <Content>
      ② 회원은 이 약관 및 관계 법령에 위반하거나 기타 고객의 의무를 위반하여
      회사 또는 타인에게 피해를 준 경우 그 손해를 배상할 책임이 있습니다.
    </Content>
    <Content>
      ③ 회사는 회원이 서비스를 이용하여 기대하는 손익이나 서비스를 통해 얻은
      정보 또는 자료 등으로 인해 발생한 손익에 대하여 책임을 부담하지
      아니합니다.
    </Content>
    <Content>
      ④ 회사는 회원이 게시하거나 보관된 자료의 내용에 관하여는 책임을 부담하지
      아니합니다.
    </Content>
    <Content>
      ⑤ 이 약관은 회원에 한하여 적용되며, 제3자로부터의 어떠한 배상, 클레임 등에
      대하여도 회사는 이 약관에 따른 책임을 부담하지 아니합니다.
    </Content>
    <Content>
      ⑥ 회사의 서비스를 이용함에 있어 회원과 장비 계약자 간의 분쟁, 배상 등에
      대하여서 어떠한 책임도 부담하지 아니합니다.
    </Content>
    <Title_h3>제17조 [손해배상의 청구]</Title_h3>
    <Content>
      손해배상의 청구는 회원이 회사에 청구 사유, 청구금액 및 산출근거를 기재하여
      서면으로 하여야 합니다.
    </Content>
    <Title_h3>제18조 [시스템 등의 소유권 및 사용권]</Title_h3>
    <Content>
      ① 회사가 회원에게 제공하는 모든 S/W시스템, 데이터베이스의 소유권이나
      프로그램 저작권, 기타 지식재산권 및 노하우(이하 &ldquo;S/W시스템
      등&rdquo;이라 합니다)는 전적으로 회사에게 있으며, 고객은 어떠한 형태로든
      위 S/W시스템 등에 대한 회사의 제반 권리를 침해할 수 없습니다.
    </Content>
    <Content_ol>
      <li>
        서비스 내 회사가 제작한 콘텐츠에 대한 저작권 기타 지적 재산권은 회사의
        소유입니다.
      </li>
      <li>
        회사가 제공하는 서비스의 디자인, 회사가 만든 텍스트, 스크립트(Script),
        그래픽, 상호간 전공 기능 등 회사가 제공하는 서비스에 관련된 모든 상표,
        서비스 마크, 로고 등에 관한 저작권 기타 지적 재산권은 관계 법령에 의하여
        회사가 보유하고 있거나 회사에게 소유권 또는 사용권이 있습니다.
      </li>
      <li>
        회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게
        귀속됩니다.
      </li>
    </Content_ol>
    <Content>
      ② 회사는 회원에게 회사가 정한 이용 조건에 따라 서비스 등을 이용할 수 있는
      이용권만을 부여하고, 회원은 이에 대한 양도, 판매, 담보 제공 등의
      처분행위를 할 수 없습니다. 회원은 본 이용약관으로 인하여 서비스를
      소유하거나 서비스에 관한 저작권을 보유하게 되는 것이 아니라 회사로부터의
      서비스 이용 허락을 받게 되는 것으로, 서비스는 정보취득 또는 개인용도로만
      제공되는 형태로 이용할 수 있습니다.
    </Content>
    <Content>
      ③ 회원은 회사가 제공하는 서비스를 이용함으로써 얻은 정보 중 회사 또는
      제공업체에 지적재산권이 귀속된 정보를 회사 또는 제공업체의 사전승낙 없이
      복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나
      제3자에게 이용하게 하여서는 안 됩니다.
    </Content>
    <Content>
      ④ 회원은 회사가 제공하는 서비스를 이용함으로써 얻은 정보 중 회사 또는
      제공업체에 지적재산권이 귀속된 정보를 회사 또는 제공업체의 사전승낙 없이
      복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나
      제3자에게 이용하게 하여서는 안 됩니다.
    </Content>
    <Content>
      ⑤ 회원은 회사의 명백한 서면 허가를 받은 경우를 제외하고는 서비스 또는 이에
      포함된 소프트웨어와 관련된 파생물 제작, 역파일, 소스 코드의 추출을 시도할
      수 없습니다.
    </Content>
    <Content>
      ⑥ 이 약관에 의한 서비스와 관련하여 회원이 제3자의 지식재산권을 침해하는
      경우 회사는 이에 대한 책임이 없으며, 이로 인하여 회사가 제3자에 대하여
      손해를 배상하는 경우 회원은 회사를 면책하여야 합니다. 이 약관상 회사 등에
      의해 제공된 시스템이나 소프트웨어 등이 제3자의 지식재산권을 침해하거나
      기타 사유로 인하여 회원이 이를 사용하지 못하는 경우 회사는 그 받은 이익의
      범위 내에서 책임을 부담합니다.
    </Content>
    <Content>
      ⑦ 회사는 회사 또는 제3자의 저작권을 보호하기 위하여 회원이 서비스를
      이용하는 동안 회원의 유, 무선 기기 상 소프트웨어가 실행되는 것을 감지하여
      자동으로 차단하는 프로그램을 사용할 수 있습니다.
    </Content>
    <Title_h3>제19조 [면책]</Title_h3>
    <Content>
      회원의 손해가 다음 각호의 사유로 발생한 경우에는 회사가 손해배상의 책임을
      지지 않습니다.
    </Content>
    <Content_ol>
      <li>천재지변, 전쟁 등 불가항력적인 경우</li>
      <li>회원의 고의 또는 과실로 인하여 발생한 경우</li>
      <li>
        회사 이외의 타 통신사업자가 제공하는 전기통신서비스의 장애로 인한 경우
      </li>
      <li>회원의 정보시스템 보안관리 소홀로 침해사고가 발생한 경우</li>
      <li>
        회원의 정보시스템에 발생한 사고의 확산을 방지하기 위한 서비스 중단
      </li>
      <li>국가비상사태 또는 전국적인 네트워크 장애와 관련한 서비스 중단</li>
      <li>전기통신서비스의 특성상 불가피한 사유가 있는 경우</li>
      <li>
        회원이 서비스에 게재한 사실의 신뢰도, 정보나 자료의 정확성 등의 내용으로
        발생하는 사고 또는 손해의 경우
      </li>
      <li>
        서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한
        손해의 경우
      </li>
      <li>
        회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 경우
      </li>
      <li>회원이 서비스를 이용하면서 얻은 자료로 인한 손해의 경우</li>
      <li>
        회원과 장비 계약자 상호 간 및 이용자와 제 3자 상호 간에 서비스를 매개로
        발생한 분 쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도
        없습니다.
      </li>
      <li>
        장비 계약자의 요청, 계약의 만료, 요금 미납 등의 사유로 인하여, 기존
        서비스를 사용하 던 장소에서 회원이 회사의 서비스 이용이 불가하더라도
        회사는 어떠한 손해도 책임을지 지 않습니다.
      </li>
      <li>
        회사에서 회원에게 무료로 제공하는 서비스의 이용과 관련해서는 어떠한
        손해도 책임을 지지 않습니다.
      </li>
    </Content_ol>
    <Title_h3>제20조 [개인정보 활용 동의]</Title_h3>
    <Content>
      ① 회원은 회사가 회사의 상품 및 서비스, 정보통신 기기 판매업, 통신서비스업,
      모바일 광고 서비스 등 기타 회사가 영위하고 있는 제반 사업 및 향후 회사가
      영위하게 될 제반 사업 일체의 홍보 및 판매 등 마케팅목적으로 서비스
      신청서에 기재된 고객의 개인정보 및 기타 이 서비스 이용에 관한 구매정보
      등을 업무 목적으로 사용하는 것에 동의합니다. 단, 회원은 언제든지
      '개인정보의 수집, 제공 및 활용에 관한 동의'를 철회할 수 있습니다.
    </Content>
    <Content>
      ② 회원은 회사에 제공한 개인정보와 관련하여 변경사항이 있는 경우에는 지체
      없이 회사에 그 변경 사실을 통지하여야 하며, 이를 위반하여 발생한 일체의
      손해에 대하여 회사는 책임을 지지 않습니다.
    </Content>
    <Content>
      ③ 수집된 고객정보는 당해 고객의 동의 없이는 본조 1항에서 정한 목적 범위를
      넘어선 용도로 이용하거나 '개인정보의 제공 및 활용 동의서'에 기재된 자
      이외의 제3자에게 제공할 수 없습니다.
    </Content>
    <Content>
      ④ 회사는 고객정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해
      고객정보를 지체 없이 파기합니다
    </Content>
    <Content>
      ⑤ 회사는 관련 법령이 정하는 바에 따라서 고객 등록정보를 포함한 고객의
      개인정보를 보호하기 위하여 노력합니다. 고객의 개인정보보호에 관해서는 관련
      법령 및 회사의 개인정보보호정책이 적용됩니다.
    </Content>
    <Content>
      ⑥ 회사는 회원의 귀책 사유로 인해 노출된 정보에 대해서 일체의 책임을 지지
      않습니다.
    </Content>
    <Title_h3>제21조 [분쟁의 해결 및 관할법원]</Title_h3>
    <Content>
      고객과 회사 간의 분쟁으로 소송이 제기될 경우 회사의 본사 소재지 법원을
      관할법원으로 합니다.
    </Content>
    <Title_h3>제22조 [회사정보 등의 제공]</Title_h3>
    <Content>
      ① 회사는 이용자가 쉽게 알 수 있도록 다음 각호의 사항을 사이트 초기 화면에
      게시합니다.
    </Content>
    <Content>② 대표자의 성명 및 상호</Content>
    <Content>
      ③ 영업소 소재지 주소(이용자의 불만을 처리할 수 있는 곳의 주소를 포함) 및
      전자우편주소
    </Content>
    <Content>④ 전화번호, Fax 번호</Content>
    <Content>⑤ 사업자등록번호</Content>
    <Content>⑥ 사이트의 이용약관</Content>
    <Content>⑦ 호스팅서비스를 제공하는 자의 상호</Content>
    <Content>⑧ 개인정보취급방침</Content>
    <Content>⑨ 개인정보관리자의 성명 및 전화번호 등의 연락처</Content>
    <Title_h3>제23조 [이용약관 변경 고지의 의무]</Title_h3>
    <Content>
      &ldquo;회사&rdquo;는 법률이나 서비스의 변경사항을 반영하기 위한 목적
      등으로 이용약관을 수정할 수 있습니다. 이용약관이 변경되는 경우 회사는 변경
      사항을 공지하며, 변경된 이용약관은 공지사항을 통해 게시하며 게시한
      날로부터 7일 후부터 효력이 발생합니다. 하지만 피치 못하게
      &ldquo;회원&rdquo;의 권리에 중요한 변경이 있을 경우 변경될 내용을 30일
      전에 미리 알려드리겠습니다.
    </Content>
    <Content>공고일자 : 2020.08.07</Content>
    <Content>시행일자 : 2020.08.14</Content>
  </Wrapper>
);
