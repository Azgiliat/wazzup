<template>
  <section class="main">
    <div class="container">
      <transition name="btn-table" mode="out-in">
        <AppButton v-if="loading || !users.length" class="main__load-button" :loading="loading" @click="loadUsers">
          Загрузить пользователей
        </AppButton>
        <Table v-else class="main__table" :rows="users" :withPagination="true" :withSearch="true"
               :popupProp="popupProp"
        >
          <TableColumn :prop="'name'" :title="'Имя'" sortable/>
          <TableColumn :prop="'company'" :title="'Компания'"/>
          <TableColumn :prop="'email'" :title="'Email'"/>
          <TableColumn :prop="'state'" :title="'Штат'" sortable/>
        </Table>
      </transition>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  methods: {
    ...mapActions('users', {
      loadUsers: 'loadUsers'
    })
  },
  components: {
    AppButton
  },
  computed: {
    ...mapState('users', {
      loading: 'loading',
    }),
    ...mapGetters('users', {
      users: 'formattedUsers'
    })
  },
  data() {
    return {
      popupProp: [
        {
          name: 'Имя',
          value: 'name'
        },
        {
          name: 'Адрес',
          value: 'address'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  &__load-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__table {
    width: 100%;
  }

  .btn-table {
    &-enter-to {
      opacity: 1;
    }

    &-leave-to, &-enter {
      opacity: 0;
    }

    &-leave-active, &-enter-active {
      transition: opacity $transition;
      will-change: opacity;
    }
  }
}
</style>
