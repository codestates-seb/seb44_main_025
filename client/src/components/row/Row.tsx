import { styled } from 'styled-components';

export const Row = styled.div`
  display: flex;
`;

export const AlignedRow = styled(Row)`
  align-items: center;
`;

export const CenteredRow = styled(Row)`
  justify-content: center;
`;

export const SpacedRow = styled(Row)`
  justify-content: space-between;
`;
