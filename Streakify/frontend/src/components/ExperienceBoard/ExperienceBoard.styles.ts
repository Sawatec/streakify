import styled from 'styled-components';

export const ExperienceBoardWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  border-bottom: 2px solid #ddd; /* Graue Trennlinie */
  margin-bottom: 20px;
`;

export const UserName = styled.h1`
  font-size: 1rem;
  color: white;
  margin: 10px 0;
`;

export const ExperienceText = styled.p`
  font-size: 1.1rem;
  color: #FF8800; /* Akzentfarbe Dunkel */
  margin: 5px 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
