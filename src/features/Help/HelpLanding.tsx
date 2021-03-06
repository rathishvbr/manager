import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from 'src/components/core/styles';
import { DocumentTitleSegment } from 'src/components/DocumentTitle';
import OtherWays from './Panels/OtherWays';
import PopularPosts from './Panels/PopularPosts';
import SearchPanel from './Panels/SearchPanel';

type ClassNames = 'root';

const styles: StyleRulesCallback<ClassNames> = (theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 14}px`,
    },
  },
});

type CombinedProps = WithStyles<ClassNames>;

export class HelpLanding extends React.Component<CombinedProps, {}> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DocumentTitleSegment segment="Get Help" />
        <SearchPanel />
        <PopularPosts />
        <OtherWays />
      </div>
    );
  }
}

const styled = withStyles(styles);

export default styled(HelpLanding);
