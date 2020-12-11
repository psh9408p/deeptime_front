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

const Content = styled.p`
  line-height: 1.7em;
  padding: 35px 0 0 0;
  margin-top: 30px;
  border-top: 1px solid #dfdfdf;
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

export default () => (
  <Wrapper>
    <Title_h1>마케팅 정보 수신 동의</Title_h1>
    <Content>
      슬로그는 개인정보보호법 및 정보통신망 이용촉진 및 정보보호 등에 관한법률
      등 관계법령에 따라 광고성 정보를 전송하기 위해 수신자의 사전 수신동의를
      받고 있으며, 광고성 정보 수신자의 수신 동의여부를 정기적으로 확인합니다.
    </Content>
    <Content_ol>
      <li>
        전송방법
        <Content_ul>
          <li>
            고객님의 모바일 App Push, 핸드폰 문자메시지(SMS), Email, 홈페이지
            팝업 등을 통해 전달될 수 있습니다.
          </li>
        </Content_ul>
      </li>
      <li>
        전송내용
        <Content_ul>
          <li>
            발송되는 마케팅 정보는 수신자에게 슬로그 웹사이트, 애플리케이션
            관련하여 제공하는 혜택(포인트, 쿠폰, 프로모션 등) 정보, 각종 이벤트
            정보 등 광고성 정보로 관련 법의 규정을 준수하여 발송됩니다. 단,
            광고성 정보 이외 의무적으로 안내되어야 하는 정보성 내용은 수신 동의
            여부와 무관하게 제공됩니다.
          </li>
        </Content_ul>
      </li>
      <li>
        철회안내
        <Content_ul>
          <li>
            고객님은 수신 동의 이후에라도 의사에 따라 동의를 철회할 수 있으며,
            수신을 동의하지 않아도 회사가 제공하는 기본적인 서비스를 이용할 수
            있으나, 당사의 마케팅 정보를 수신하지 못할 수 있습니다.
          </li>
        </Content_ul>
      </li>
      <li>
        수신동의 변경
        <Content_ul>
          <li>
            회사의 홈페이지(www.deeeeptime.com)의 프로필 변경에서
            변경(동의/철회)할 수 있습니다.
          </li>
        </Content_ul>
      </li>
      <li>
        개인정보 이용목적과 보유항목 상세내용
        <Content_ol_roman>
          <li>
            이용하는 개인정보 항목
            <Content_ul>
              <li>
                휴대전화번호, 이메일주소, 성함, 닉네임, 구매이력, 결제정보
              </li>
            </Content_ul>
          </li>
          <li>
            이용목적
            <Content_ul>
              <li>
                혜택 정보, 각종 이벤트 정보, 상품 정보, 신규 서비스 안내 등
                광고성 정보 제
              </li>
            </Content_ul>
          </li>
        </Content_ol_roman>
      </li>
      <li>
        개인정보 보유 및 이용 기간
        <Content_ul>
          <li>
            마케팅 활용 동의 일로부터 회원 탈퇴 또는 마케팅 동의 철회 시까지
            보유 및 이용
          </li>
        </Content_ul>
      </li>
    </Content_ol>
  </Wrapper>
);
