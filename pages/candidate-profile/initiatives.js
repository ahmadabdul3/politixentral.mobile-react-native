import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from 'px/styles/pages/candidate-initiatives';

export default class Initiatives extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.mainView}>
        <MissionStatement />
        <InitiativeList />
      </ScrollView>
    );
  }
}

class MissionStatement extends PureComponent {
  render() {
    return (
      <View style={styles.missionStatement}>
        <Text style={styles.sectionTitle}>
          {`mission  statement`.toUpperCase()}
        </Text>
        <Text style={styles.statementBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam.
        </Text>
      </View>
    );
  }
}

class InitiativeList extends PureComponent {
  render() {
    return (
      <View style={styles.initiativeList}>
        <Text style={styles.sectionTitle}>
          {`top initiatives`.toUpperCase()}
        </Text>
        <Initiative title='Building New Sidewalks' status={initiativeStatus.complete} />
        <Initiative title='Improving Lighting' status={initiativeStatus.notStarted} />
        <Initiative title='Reducing Crime' status={initiativeStatus.inProgress} />
      </View>
    );
  }
}

const initiativeStatus = {
  complete: 'complete',
  inProgress: 'in-progress',
  notStarted: 'not-started',
};

class Initiative extends PureComponent {
  get status() {
    switch (this.props.status) {
      case initiativeStatus.complete: return <InitiativeStatusComplete />;
      case initiativeStatus.inProgress: return <InitiativeStatusInProgress />;
      case initiativeStatus.notStarted: return <InitiativeStatusNotStarted />;
    }
  }

  render() {
    return (
      <View style={styles.initiative}>
        <View style={styles.initiativeHeader}>
          <View style={styles.initiativeTitle}>
            <Text style={styles.initiativeTitleText}>
              {this.props.title}
            </Text>
          </View>
          { this.status }
        </View>
      </View>
    );
  }
}

class InitiativeStatusComplete extends PureComponent {
  render() {
    return (
      <InitiativeStatus
        statusText={initiativeStatus.complete}
        styles='initiativeStatusComplete'
      />
    );
  }
}

class InitiativeStatusInProgress extends PureComponent {
  render() {
    return (
      <InitiativeStatus
        statusText={initiativeStatus.inProgress}
        styles='initiativeStatusInProgress'
      />
    );
  }
}

class InitiativeStatusNotStarted extends PureComponent {
  render() {
    return (
      <InitiativeStatus
        statusText={initiativeStatus.notStarted}
        styles='initiativeStatusNotStarted'
      />
    );
  }
}

class InitiativeStatus extends PureComponent {
  render() {
    return (
      <View style={styles.initiativeStatus}>
        <Text style={styles[this.props.styles]}>
          { this.props.statusText.toUpperCase() }
        </Text>
      </View>
    );
  }
}
