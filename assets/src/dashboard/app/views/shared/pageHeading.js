/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { StoriesPropType } from '../../../types';
import { DASHBOARD_LEFT_NAV_WIDTH } from '../../../constants/pageStructure';
import {
  TypographyPresets,
  NavMenuButton,
  StandardViewContentGutter,
} from '../../../components';
import TypeaheadSearch from './typeaheadSearch';
import TelemetryBanner from './telemetryBanner';

const StyledHeader = styled.h2`
  ${TypographyPresets.ExtraExtraLarge};
  font-weight: ${({ theme }) => theme.DEPRECATED_THEME.typography.weight.bold};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;
  font-size: 30px;
  white-space: nowrap;

  @media ${({ theme }) => theme.DEPRECATED_THEME.breakpoint.tablet} {
    font-size: 24px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: ${({ centerContent }) =>
    centerContent ? 'center' : 'flex-end'};
  height: 100%;
`;

const SearchContainer = styled.div`
  display: inline-block;
  vertical-align: baseline;
  position: relative;
  width: 100%;
  height: 29px;
  @media ${({ theme }) => theme.DEPRECATED_THEME.breakpoint.smallDisplayPhone} {
    left: ${({ theme }) =>
      `${theme.DEPRECATED_THEME.standardViewContentGutter.min}px`};
    max-width: 100%;
    justify-content: flex-start;
  }
`;

const SearchInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: min(${DASHBOARD_LEFT_NAV_WIDTH}px, 100%);
  display: flex;
  justify-content: flex-end;
`;

const HeadingBodyWrapper = styled(StandardViewContentGutter)`
  display: grid;
  grid-template-columns: 25% 50% 1fr;
  align-items: center;
  height: 75px;
  padding-bottom: 3px;
  border-bottom: ${({ theme }) =>
    theme.DEPRECATED_THEME.subNavigationBar.border};
`;

export const HeaderToggleButtonContainer = styled.div`
  display: block;
  flex: 1;
  height: 65%;
`;

const PageHeading = ({
  children,
  defaultTitle,
  searchPlaceholder,
  centerContent = false,
  stories = [],
  showTypeahead = true,
  handleTypeaheadChange,
  typeaheadValue = '',
}) => {
  return (
    <>
      <TelemetryBanner />
      <HeadingBodyWrapper>
        <StyledHeader>
          <NavMenuButton showOnlyOnSmallViewport />
          {defaultTitle}
        </StyledHeader>
        <Content centerContent={centerContent}>{children}</Content>
        {showTypeahead && (
          <SearchContainer>
            <SearchInner>
              <TypeaheadSearch
                placeholder={searchPlaceholder}
                currentValue={typeaheadValue}
                stories={stories}
                handleChange={handleTypeaheadChange}
              />
            </SearchInner>
          </SearchContainer>
        )}
      </HeadingBodyWrapper>
    </>
  );
};

PageHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  centerContent: PropTypes.bool,
  defaultTitle: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string,
  stories: StoriesPropType,
  showTypeahead: PropTypes.bool,
  handleTypeaheadChange: PropTypes.func,
  typeaheadValue: PropTypes.string,
};

export default PageHeading;
