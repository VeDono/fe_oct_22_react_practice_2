import cn from 'classnames';

export const Filters = ({
  searchQuery,
  resetFilters,
  selectedUserId,
  usersFromServer,
  setQueryForSeach,
  selectedAlbumsId,
  albumsFromServer,
  setSelectedUserId,
  setSelectedAlbumsId,
  handlerAlbumSelector,
}) => (
  <div className="block">
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          href="#/"
          className={cn(
            { 'is-active': selectedUserId === '' },
          )}
          onClick={() => setSelectedUserId('')}
        >
          All
        </a>

        {usersFromServer.map(userFromServer => (
          <a
            href="#/"
            key={userFromServer.id}
            className={cn(
              { 'is-active': userFromServer.id === selectedUserId },
            )}
            onClick={() => setSelectedUserId(userFromServer.id)}
          >
            {userFromServer.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            type="text"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setQueryForSeach(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {searchQuery && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                onClick={() => setQueryForSeach('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          className={cn(
            'button is-success mr-6',
            { 'is-outlined': selectedAlbumsId.length },
          )}
          onClick={() => setSelectedAlbumsId([])}
        >
          All
        </a>

        {albumsFromServer.map(albumFromServer => {
          const albumId = albumFromServer.id;

          function truncateString(str, maxLength) {
            if (str.length > maxLength) {
              const truncated = str.slice(0, maxLength);

              return truncated.endsWith(' ')
                ? `${truncated.trim()}...`
                : `${truncated}...`;
            }

            return str;
          }

          return (
            <a
              href="#/"
              key={albumId}
              className={cn('button mr-2 my-1', {
                'is-info': selectedAlbumsId.includes(albumFromServer.id),
              })}
              onClick={() => handlerAlbumSelector(albumId)}
            >
              {truncateString(albumFromServer.title, 7)}
            </a>
          );
        })}
      </div>

      <div className="panel-block">
        <a
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  </div>
);
