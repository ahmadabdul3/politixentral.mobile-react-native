import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import styles from 'px/styles/pages/candidate-initiatives';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Feather,
  Entypo,
  Octicons,
} from '@expo/vector-icons';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import PageSection from 'px/components/page-section';

export default class Initiatives extends PureComponent {
  render() {
    const { politicianData } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.whatStandFor}>
          <Text style={styles.sectionTitle}>
            {`what i stand for`.toUpperCase()}
          </Text>
          <View style={styles.initiativesWrapper}>
            <Initiative
              title='increase safety'
              image={
                <Image
                  source={{ uri: 'https://pre00.deviantart.net/7aae/th/pre/i/2018/261/a/4/screen_shot_2018_09_18_at_1_14_49_pm_by_duxfox-dcn66hn.png' }}
                  style={{ width: 40, height: 50, overflow: 'hidden' }}
                  resizeMode='cover'
                />
              }
            />
            <Initiative
              title='reduce taxes'
              image={
                <Image
                  source={{ uri: 'https://pre00.deviantart.net/7b89/th/pre/i/2018/261/9/5/screen_shot_2018_09_18_at_1_15_29_pm_by_duxfox-dcn66hh.png' }}
                  style={{ width: 40, height: 40, overflow: 'hidden' }}
                  resizeMode='cover'
                />
              }
            />
            <Initiative
              title='improve education'
              image={
                <Image
                  source={{ uri: 'https://pre00.deviantart.net/7aa9/th/pre/i/2018/261/f/7/screen_shot_2018_09_18_at_1_14_08_pm_by_duxfox-dcn66hu.png' }}
                  style={{ width: 45, height: 45, overflow: 'hidden' }}
                  resizeMode='cover'
                />
              }
            />
          </View>
          <Committees politicianData={politicianData} />
        </View>
      </View>
    );
  }
}

class Committees extends PureComponent {
  render() {
    const { committees, firstName, lastName } = this.props.politicianData;
    if (!!committees === false || committees.length < 1) {
      return (
        <PageSection title='committees'>
          <Text style={{ marginLeft: 25, marginRight: 25 }}>
            { firstName } { lastName } is not currently part of any committees
          </Text>
        </PageSection>
      );
    }

    return (
      <PageSection title='committees'>
        { committees.map((c) => (<CommitteeItem key={c.committeeTermId} data={c} />)) }
      </PageSection>
    );
  }
}

class CommitteeItem extends PureComponent {
  static iconFor = {
    'Tax Abatement': {
      name: 'attach-money',
      iconBrand: MaterialIcons,
    },
    'Education': {
      name: 'md-school',
      iconBrand: Ionicons,
    },
    'Human Services': {
      name: 'human-male-female',
      iconBrand: MaterialCommunityIcons,
    },
    'Finance': {
      name: 'finance',
      iconBrand: MaterialCommunityIcons,
    },
    'Public Safety': {
      name: 'safety-cone',
      iconBrand: Foundation,
    },
    'Legislation': {
      name: 'law',
      iconBrand: Octicons,
    },
    'Youth Services': {
      name: 'child-friendly',
      iconBrand: MaterialIcons,
    },
    'Community Development': {
      name: 'md-people',
      iconBrand: Ionicons,
    },
    'Aldermanic Affairs': {
      name: 'md-people',
      iconBrand: Ionicons,
    },
    'City Services and Environmental Policy': {
      name: 'city',
      iconBrand: MaterialCommunityIcons,
    },
  };

  get text() {
    const { committeeName, committeeTermTitle } = this.props.data;
    if (!!committeeTermTitle === false) return committeeName;
    return `${committeeName} - ${committeeTermTitle}`;
  }

  get icon() {
    const { committeeName } = this.props.data;
    const icon = CommitteeItem.iconFor[committeeName];

    return (
      <icon.iconBrand
        name={icon.name}
        size={24}
        color={colors.brandPurple}
        style={{ marginLeft: 2 }}
      />
    );
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.committeeItem}>
        <View style={styles.committeeItemIcon}>
          { this.icon }
        </View>
        <Text style={styles.committeeItemText}>
          { this.text }
        </Text>
      </View>
    )
  }
}

// <MaterialCommunityIcons
//   name="shield-half-full" size={35} color={colors.secondary}
//   style={{ marginTop: 5, marginLeft: 3 }}
// />

// <MaterialIcons
//   name='money-off' size={35} color={colors.secondary}
//   style={{ marginTop: 5, marginLeft: 1 }}
// />

// <Foundation
//   name='book-bookmark' size={35} color={colors.secondary}
//   style={{ marginTop: 5, marginLeft: 3 }}
// />

class Initiative extends PureComponent {
  render() {
    const { title, image } = this.props;
    return (
      <View style={styles.initiative}>
        <View style={styles.initiativeImage}>
          { image }
        </View>
        <Text style={styles.initiativeTitle}>
          { title.toUpperCase() }
        </Text>
      </View>
    );
  }
}

const status = {
  complete: 'complete',
  inProgress: 'in-progress',
  notStarted: 'not-started',
};

class Projects extends PureComponent {
  get projects() {
    const projects = getProjects();

    return projects.map((proj, index) => {
      const firstInSequence = index === 0;
      const lastInSequence = index === (projects.length - 1);
      const title = proj.title;
      const status = proj.status;

      return (
        <ProjectSummary
          key={index}
          title={title}
          status={status}
          firstInSequence={firstInSequence}
          lastInSequence={lastInSequence}
        />
      );
    })
  }

  render() {
    return (
      <View style={styles.projects}>
        <Text style={styles.sectionTitle}>
          {`projects`.toUpperCase()}
        </Text>
        { this.projects }
      </View>
    );
  }
}

function getProjects() {
  return [
    { title: 'Building New Sidewalks', status: status.complete },
    { title: 'Improving Lighting', status: status.notStarted },
    { title: 'Reducing Crime', status: status.inProgress },
  ];
}

class ProjectSummary extends PureComponent {
  get status() {
    switch (this.props.status) {
      case status.complete: return <ProjectStatusComplete />;
      case status.inProgress: return <ProjectStatusInProgress />;
      case status.notStarted: return <ProjectStatusNotStarted />;
    }
  }

  get style() {
    const { firstInSequence, lastInSequence } = this.props;
    if (!!firstInSequence) return styles.projectFirst;
    if (!!lastInSequence) return styles.projectLast;
    return styles.project;
  }

  render() {
    const { title } = this.props;

    return (
      <View style={this.style}>
        <ProjectHeader title={title} status={this.status} />
        <ProjectMetadata />
        <ProjectFeedback />
      </View>
    );
  }
}

class ProjectHeader extends PureComponent {
  render() {
    return (
      <View style={styles.projectHeader}>
        <View style={styles.projectTitle}>
          <Text style={styles.projectTitleText}>
            {this.props.title}
          </Text>
        </View>
        { this.props.status }
      </View>
    );
  }
}

class ProjectMetadata extends PureComponent {
  render() {
    return (
      <View style={styles.projectMetadata}>
        <LabelValue label='budget' value='$50,000' />
        {
          // <LabelValue label='start' value='09/10/18' />
          // <LabelValue label='end' value='04/01/20' />
        }
      </View>
    );
  }
}

class ProjectFeedback extends PureComponent {
  render() {
    return (
      <View style={styles.projectFeedback}>
        <Feedback number={57}>
          <MaterialIcons name="comment" size={14} color={colors.textColorLighter} />
        </Feedback>
        <Feedback number={300}>
          <Ionicons name="md-thumbs-up" size={14} color={colors.brandPurple} />
        </Feedback>
        <Feedback number={200}>
          <Ionicons name="md-thumbs-down" size={14} color={colors.textColorLighter} />
        </Feedback>
      </View>
    );
  }
}

class Feedback extends PureComponent {
  render() {
    return (
      <View style={styles.feedback}>
        { this.props.children }
        <Text style={styles.feedbackNumber}>
          { `  ${this.props.number}` }
        </Text>
      </View>
    );
  }
}

class LabelValue extends PureComponent {
  render() {
    return(
      <Text style={styles.labelValue}>
        <Text style={styles.labelValueLabel}>
          { this.props.label.toUpperCase() }
        </Text>
        <Text style={styles.labelValueValue}>
          { `  ${this.props.value}` }
        </Text>
      </Text>
    );
  }
}

class ProjectStatusComplete extends PureComponent {
  render() {
    return (
      <ProjectStatus
        statusText={status.complete}
        styles='projectStatusComplete'
        icon={
          <Feather
            name="check-circle" size={12}
            color={colors.accent} />
        }
      />
    );
  }
}

class ProjectStatusInProgress extends PureComponent {
  render() {
    return (
      <ProjectStatus
        statusText={status.inProgress}
        styles='projectStatusInProgress'
        icon={
          <Entypo
            name="hour-glass" size={12}
            color={colors.orange} />
        }
      />
    );
  }
}

class ProjectStatusNotStarted extends PureComponent {
  render() {
    return (
      <ProjectStatus
        statusText={status.notStarted}
        styles='projectStatusNotStarted'
        icon={
          <Feather
            name="x-circle" size={12}
            color={colors.red} />
        }
      />
    );
  }
}

class ProjectStatus extends PureComponent {
  render() {
    const { icon, statusText } = this.props;

    return (
      <View style={styles.projectStatus}>
        <Text style={styles.projectStatusText}>
          { statusText.toUpperCase() }
        </Text>
        { icon }
      </View>
    );
  }
}
