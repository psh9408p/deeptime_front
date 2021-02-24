import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  min-width: 320px;
  padding: 40px 20px;
  h1 {
    font-size: 2.25rem;
    letter-spacing: -0.016em;
    line-height: 3.25rem;
    font-weight: 700;
    white-space: pre-line;
    text-align: left;
    margin-bottom: 32px;
  }
`;

const SectionTitle = styled.p`
  font-size: 2.25rem;
  letter-spacing: -0.016em;
  line-height: 3.25rem;
  font-weight: 700;
  white-space: pre-line;
  text-align: left;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    font-size: 3.75rem;
    letter-spacing: -0.02em;
    line-height: 5.5rem;
    font-weight: 700;
    margin-bottom: 60px;
  }
  @media (min-width: 1024px) {
    font-size: 4.25rem;
    letter-spacing: -0.02em;
    line-height: 5.5rem;
    font-weight: 700;
    margin-bottom: 60px;
    text-align: center;
  }
`;
const BoxWrap = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    min-width: 768px;
    justify-content: center;
  }
`;
const Box = styled.div`
  box-shadow: rgb(0 0 0 / 14%) 0px 3px 7px;
  border-radius: 8px;
  margin-bottom: 12px;
  @media (min-width: 768px) {
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    width: 296px;
  }
`;

const BoxTitle = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: rgb(246, 246, 246);
  padding: 4px 12px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  @media (min-width: 768px) {
    padding: 8px 20px;
    height: 88px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 1.125rem;
    letter-spacing: -0.012em;
    line-height: 2rem;
    font-weight: bold;
  }
  @media (min-width: 1024px) {
    font-size: 1.375rem;
    letter-spacing: -0.014em;
    line-height: 2.5rem;
    font-weight: bold;
  }
`;

const Price = styled.div`
  box-sizing: border-box;
  padding: 12px 12px 8px;
`;

const Cost = styled.p`
  white-space: pre-line;
  font-size: 0.75rem;
  letter-spacing: -0.012em;
  line-height: 1.375rem;
  font-weight: 400;
  color: rgb(162, 161, 161);
  text-decoration: line-through;
  text-align: right;
`;

const Cost2 = styled.p`
  white-space: pre-line;
  font-size: 1.125rem;
  letter-spacing: -0.012em;
  line-height: 2rem;
  font-weight: 700;
  text-align: right;
`;
const Discount = styled.p`
  justify-content: center;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 700;
  width: 50px;
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
  background-color: rgb(208, 4, 31);
  color: rgb(255, 255, 255);
  text-align: center;
  margin-top: 5.5px;
  margin-right: 5.5px;
`;

const Hidden = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: relative;
    width: fit-content;
    margin: 0px auto;
  }
`;

const HiddenItem = styled.p`
  display: none;

  @media (min-width: 768px) {
    display: block;
    font-size: 0.875rem;
    letter-spacing: -0.012em;
    line-height: 1.75rem;
    font-weight: 400;
    text-align: left;
    margin-left: 24px;
  }
`;

const OptionBox = styled.div`
  padding: 0px 12px 8px;
`;

const Option = styled.p`
  white-space: pre-line;
  font-size: 0.625rem;
  letter-spacing: -0.012em;
  line-height: 1rem;
  font-weight: 400;
  color: rgb(162, 161, 161);
  text-align: left;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Buy = styled.p`
  display: none;
  @media (min-width: 768px) {
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: -0.012em;
    font-weight: 400;
    display: block;
    width: 100%;
    height: 52px;
    line-height: 52px;
    margin-bottom: 12px;
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
    border-radius: 0.25rem;
    text-align: center;
    cursor: pointer;
    padding: 0px 1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Payment = () => {
  return (
    <>
      <Section>
        <SectionTitle>
          기간에 따라,
          <br /> 목표 점수에 맞는
        </SectionTitle>
        <BoxWrap>
          <Box>
            <div>
              <BoxTitle>900+ 고득점 풀패키지(응시권)</BoxTitle>
              <div>
                <Price>
                  <Cost>₩1,000,000</Cost>
                  <Flex>
                    <Discount>73% 할인</Discount>
                    <Cost2>₩600,000</Cost2>
                  </Flex>
                </Price>
                <Hidden>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                </Hidden>
              </div>

              <OptionBox>
                <Buy>구입하기</Buy>
                <Option>*쿠폰팩 미적용 가격</Option>
              </OptionBox>
            </div>
          </Box>
          <Box>
            <div>
              <BoxTitle>900+ 고득점 풀패키지(응시권)</BoxTitle>
              <div>
                <Price>
                  <Cost>₩7,000,000</Cost>
                  <Flex>
                    <Discount>73% 할인</Discount>
                    <Cost2>₩600,000</Cost2>
                  </Flex>
                </Price>
                <OptionBox>
                  <Buy>구입하기</Buy>
                  <Option>*쿠폰팩 미적용 가격</Option>
                </OptionBox>
              </div>
              <div></div>
            </div>
          </Box>
          <Box>
            <div>
              <BoxTitle>900+ 고득점 풀패키지(응시권)</BoxTitle>
              <div>
                <Price>
                  <Cost>₩1,000,000</Cost>
                  <Flex>
                    <Discount>73% 할인</Discount>
                    <Cost2>₩600,000</Cost2>
                  </Flex>
                </Price>
                <OptionBox>
                  <a style={{ display: 'none' }}>구입하기</a>
                  <Option>*쿠폰팩 미적용 가격</Option>
                </OptionBox>
              </div>
              <div></div>
            </div>
          </Box>
        </BoxWrap>
      </Section>
    </>
  );
};

export default Payment;
