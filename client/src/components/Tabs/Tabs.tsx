import { styled } from 'styled-components';

const Heading3 = styled.h3`
  font-size: var(--heading3-font-size);
  font-weight: var(--heading3-font-weight);
  line-height: var(--heading3-line-height);
  color: white;
  cursor: pointer;

  &:not(:first-child, :last-child):nth-child(2n) {
    margin-left: 5px;
    margin-right: 5px;
    padding-bottom: 5px;
    cursor: auto;
  }
`;

const Tab = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const TabPage = () => {
  return (
    <Tab>
      <Heading3
        onClick={() => {
          console.log('기본페이지');
        }}
      >
        기본페이지
      </Heading3>
      <Heading3>|</Heading3>
      <Heading3
        onClick={() => {
          console.log('아티스트페이지');
        }}
      >
        아티스트페이지
      </Heading3>
    </Tab>
  );
};

const TabPerformance = () => {
  return (
    <Tab>
      <Heading3
        onClick={() => {
          console.log('전체');
        }}
      >
        전체
      </Heading3>
      <Heading3>|</Heading3>
      <Heading3
        onClick={() => {
          console.log('진행중공연');
        }}
      >
        진행중공연
      </Heading3>
      <Heading3>|</Heading3>
      <Heading3
        onClick={() => {
          console.log('지난공연');
        }}
      >
        지난공연
      </Heading3>
    </Tab>
  );
};

export const TabsPreview = () => {
  return (
    <>
      <TabPage />
      <TabPerformance />
    </>
  );
};
