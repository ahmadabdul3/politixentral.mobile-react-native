import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from 'px/styles/pages/candidate-initiatives';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';

export default class Initiatives extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.mainView}>
        <Projects />
      </ScrollView>
    );
  }
}

const status = {
  complete: 'complete',
  inProgress: 'in-progress',
  notStarted: 'not-started',
};

class Projects extends PureComponent {
  render() {
    return (
      <View style={styles.projects}>
        <Text style={styles.sectionTitle}>
          {`top projects`.toUpperCase()}
        </Text>
        <ProjectSummary title='Building New Sidewalks' status={status.complete} />
        <ProjectSummary title='Improving Lighting' status={status.notStarted} />
        <ProjectSummary title='Reducing Crime' status={status.inProgress} />
      </View>
    );
  }
}

class ProjectSummary extends PureComponent {
  get status() {
    switch (this.props.status) {
      case status.complete: return <ProjectStatusComplete />;
      case status.inProgress: return <ProjectStatusInProgress />;
      case status.notStarted: return <ProjectStatusNotStarted />;
    }
  }

  render() {
    return (
      <View style={styles.project}>
        <ProjectHeader title={this.props.title} status={this.status} />
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
      />
    );
  }
}

class ProjectStatus extends PureComponent {
  render() {
    return (
      <View style={styles.projectStatus}>
        <Text style={styles[this.props.styles]}>
          { this.props.statusText.toUpperCase() }
        </Text>
      </View>
    );
  }
}
