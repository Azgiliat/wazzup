<template>
  <section class="main">
    <div class="container">
      <AppButton :loading="loading" @click="loadUsers">
        Загрузить пользователей
      </AppButton>
      <Table :rows="users">
        <TableColumn :prop="'name'" :title="'Имя'" sortable/>
        <TableColumn :prop="'company'" :title="'Компания'" />
        <TableColumn :prop="'email'" :title="'Email'" />
        <TableColumn :prop="'state'" :title="'Штат'" sortable />
      </Table>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
